import signal
import sys
from abc import ABC, abstractmethod
from typing import List, Dict

from confluent_kafka.cimpl import Message, Consumer

class BaseKafkaConsumer(ABC):
    def __init__(
            self,
            topics: List[str],
            group_id: str,
            bootstrap_servers="localhost:9092", # should pass from .env
            auto_offset_reset="earliest"
    ):
        self.running = True
        self.topics = topics

        self.consumer = Consumer({
            'bootstrap.servers': bootstrap_servers,
            'group.id': group_id,
            'auto.offset.reset': auto_offset_reset,
        })

        signal.signal(signal.SIGINT, self._shutdown)
        signal.signal(signal.SIGTERM, self._shutdown)

    def _shutdown(self, signum, frame):
        print("Shutting down Kafka consumer...")
        self.running = False

    def start(self):
        self.consumer.subscribe(self.topics)
        print(f"Subscribed to topics: {self.topics}")

        while self.running:
            msg = self.consumer.poll(timeout=1.0)
            if msg is None:
                continue
            if msg.error():
                # TODO: replace with real log message
                print(f"Kafka error: {msg.error()}")
                continue

            try:
                # TODO: add log message for the incoming message
                self.handle_message(msg, dict(msg.headers()))
            except Exception as e:
                print(f"Error handling message: {e}", file=sys.stderr)

        self.consumer.close()

    @abstractmethod
    def handle_message(self, msg: Message, headers: Dict[str, any] = None):
        """
        Override this method to process incoming messages.
        """
        pass
