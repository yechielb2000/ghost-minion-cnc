"""
Files consumer gets S3 url for the file in the message headers.
"""
from typing import Dict

from confluent_kafka.cimpl import Message

from parsers.base_consumer import BaseKafkaConsumer


class FilesConsumer(BaseKafkaConsumer):

    def handle_message(self, msg: Message, headers: Dict[str, any] = None):
        pass