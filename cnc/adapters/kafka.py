import os

from confluent_kafka import Producer


def get_kafka_producer() -> Producer:
    address = os.getenv("KAFKA_ADDRESS", "localhost")
    port = os.getenv("KAFKA_PORT", "9092")
    return Producer(**{
        'bootstrap.servers': f'{address}:{port}'
    })
