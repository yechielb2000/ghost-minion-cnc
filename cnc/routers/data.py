from typing import List

from confluent_kafka.cimpl import Producer
from fastapi import APIRouter, Depends

from cnc.auth.validate_agent import validate_token
from shared.adapters.mq.kafka import get_kafka_producer, delivery_callback
from shared.schemas.data import DataBase

data_router = APIRouter(
    prefix="/data",
    dependencies=[Depends(validate_token)]
)


@data_router.post("")
def receive_data(data_list: List[DataBase], kafka_producer: Producer = Depends(get_kafka_producer)):
    for data in data_list:
        kafka_producer.produce(
            topic=data.data_type,
            key=data.agent_id,
            value=data.model_dump().encode(), # need to provide s3 url for data if the data is media
            on_delivery=delivery_callback
        )
        kafka_producer.poll(0)
