"""
Files consumer gets S3 url for the file in the message headers.
"""

from typing import Dict

from confluent_kafka.cimpl import Message

from parsers.base_consumer import BaseKafkaConsumer
from shared.schemas.agent import AgentCreate


class ToolsTelemetryConsumer(BaseKafkaConsumer):

    def handle_message(self, msg: Message, headers: Dict[str, any] = None):
        """
        set parameters for agent and upsert it
        set
        - last seen
        """



