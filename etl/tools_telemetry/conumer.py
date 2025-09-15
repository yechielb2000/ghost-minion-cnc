"""
Files consumer gets S3 url for the file in the message headers.
"""
import json
from typing import Dict

from confluent_kafka import Message
from consumers.base_consumer import BaseKafkaConsumer

from shared.sdks.agent_sdk import AgentSDK


class ToolsTelemetryConsumer(BaseKafkaConsumer):

    def handle_message(self, msg: Message, headers: Dict[str, any] = None):
        try:
            res = AgentSDK().upsert_agent(json.loads(msg.value().decode('utf-8')))
            print(res)  # TODO: replace with a real log message
        except Exception as e:
            print(e)
