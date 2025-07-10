from contextlib import asynccontextmanager
from http import HTTPStatus
from uuid import uuid4

from confluent_kafka import Producer
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends, status

from config import s3_client, S3_BUCKET, MAX_FILE_UPLOAD_SIZE
from schemas import CompleteUpload
from services.data_reciver.kafka_producer import get_kafka_producer, flush_producer, send_to_kafka
from shared.schemas import DataCreate


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    flush_producer()


app = FastAPI(lifespan=lifespan)


@app.post("/init-upload")
def init_upload(
        agent_id: str = Form(...),
        task_id: str = Form(...),
        filename: str = Form(...)
):
    key = f"{agent_id}/{task_id}/{uuid4()}_{filename}"
    try:
        response = s3_client.create_multipart_upload(Bucket=S3_BUCKET, Key=key)
        return {"upload_id": response["UploadId"], "key": key}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"S3 init error: {e}")


@app.post("/upload-part")
async def upload_part(
        upload_id: str = Form(...),
        key: str = Form(...),
        part_number: int = Form(...),
        file: UploadFile = File(..., le=MAX_FILE_UPLOAD_SIZE)
):
    try:
        body = await file.read()
        response = s3_client.upload_part(
            Bucket=S3_BUCKET,
            Key=key,
            PartNumber=part_number,
            UploadId=upload_id,
            Body=body
        )
        return {"ETag": response["ETag"], "PartNumber": part_number}
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, detail=f"Upload part error: {e}")


@app.post("/complete-upload")
def complete_upload(payload: CompleteUpload, producer: Producer = Depends(get_kafka_producer)):
    try:
        s3_client.complete_multipart_upload(
            Bucket=S3_BUCKET,
            Key=payload.key,
            UploadId=payload.upload_id,
            MultipartUpload={"Parts": payload.parts}
        )
        producer.produce(topic=payload.data_type.value, key=payload.task_id, value=payload.model_dump())
        producer.poll(0)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Complete upload error: {e}")


@app.post("/data", status_code=status.HTTP_201_CREATED)
async def receive_data(data: DataCreate, producer: Producer = Depends(get_kafka_producer())):
    try:
        producer.produce(topic=data.data_type.value, key=data.task_id, value=data.model_dump())
        producer.poll(0)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error receiving data: {e}")
