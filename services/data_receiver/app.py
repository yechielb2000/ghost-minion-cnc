from contextlib import asynccontextmanager
from http import HTTPStatus
from typing import Union, List, Dict
from uuid import uuid4

import uvicorn
from confluent_kafka import Producer
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends, status

from config import s3_client, MAX_FILE_UPLOAD_SIZE
from services.data_receiver.kafka_producer import get_kafka_producer, flush_producer
from services.data_receiver.logger import setup_logger
from shared.models.data import DataType
from shared.schemas import DataCreate
from shared.schemas.data import DataMetadata


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger = setup_logger()
    logger.info(f"Starting data receiver service")
    yield
    flush_producer()


app = FastAPI(lifespan=lifespan)


@app.post("/init-upload")
def init_upload(
        agent_id: str = Form(...),
        task_id: str = Form(...),
        filename: str = Form(...),
        data_type: Union[DataType.SCREENSHOT, DataType.FILE] = Form(DataType.FILE),
):
    if data_type not in [DataType.SCREENSHOT, DataType.FILE]:
        return HTTPException(status_code=HTTPStatus.UNPROCESSABLE_ENTITY, detail="Invalid data type")

    key = f"{agent_id}/{task_id}/{uuid4()}_{filename}"
    try:
        response = s3_client.create_multipart_upload(Bucket=data_type.value, Key=key)
        return {"upload_id": response["UploadId"], "key": key}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"S3 init error: {e}")


@app.post("/upload-part")
async def upload_part(
        upload_id: str = Form(...),
        key: str = Form(...),
        part_number: int = Form(...),
        data_type: Union[DataType.SCREENSHOT, DataType.FILE] = Form(DataType.FILE),
        file: UploadFile = File(..., le=MAX_FILE_UPLOAD_SIZE)
):
    try:
        body = await file.read()
        response = s3_client.upload_part(
            Bucket=data_type.value,
            Key=key,
            PartNumber=part_number,
            UploadId=upload_id,
            Body=body
        )
        return {"ETag": response["ETag"], "PartNumber": part_number}
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, detail=f"Upload part error: {e}")


@app.post("/complete-upload")
def complete_upload(
        agent_id: str = Form(...),
        task_id: str = Form(...),
        key: str = Form(...),
        upload_id: str = Form(...),
        parts: List[Dict[str, object]] = Form(...),
        data_type: Union[DataType.FILE, DataType.SCREENSHOT] = Form(...),
        producer: Producer = Depends(get_kafka_producer)
):
    if data_type not in [DataType.SCREENSHOT, DataType.FILE]:
        return HTTPException(status_code=HTTPStatus.UNPROCESSABLE_ENTITY, detail="Invalid data type")

    data_metadata = DataMetadata(
        agent_id=agent_id,
        task_id=task_id,
        extra=dict(
            parts=parts,
            upload_id=upload_id,
        )
    )

    try:
        s3_client.complete_multipart_upload(
            Bucket=data_type.value,
            Key=key,
            UploadId=upload_id,
            MultipartUpload={"Parts": parts}
        )
        producer.produce(topic=data_type.value, key=payload.task_id, value=data)
        producer.poll(0)
        return None
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Complete upload error: {e}")


@app.post("/data", status_code=status.HTTP_201_CREATED)
async def receive_data(data: DataCreate, producer: Producer = Depends(get_kafka_producer())):
    try:
        producer.produce(topic=data.data_type.value, key=data.task_id, value=data.model_dump())
        producer.poll(0)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error receiving data: {e}")


if __name__ == '__main__':
    uvicorn.run(app, port=8085)
