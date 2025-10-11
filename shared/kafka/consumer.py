import signal
import threading
from collections.abc import Generator
from typing import List

from confluent_kafka import Consumer, TopicPartition, KafkaException

from shared.etl_dtos.data_types import DataType
from shared.etl_dtos.record_message import RecordMessage
from shared.logger import logger


class RecordConsumer:

    def __init__(
            self,
            topic: DataType,
            batch_size: int = 10,
            poll_timeout: float = 1.0,
            bootstrap_servers: str = 'localhost:9092',
    ):
        """
        :param bootstrap_servers: Kafka bootstrap servers
        :param topic: Topic to subscribe to (DataType enum)
        :param batch_size: Number of messages to consume in one batch
        :param poll_timeout: Timeout in seconds for each poll
        """
        self.topic = topic.value if hasattr(topic, "value") else str(topic)
        self.batch_size = batch_size
        self.poll_timeout = poll_timeout
        self.stop_event = threading.Event()

        self.consumer = Consumer(
            {
                "bootstrap.servers": bootstrap_servers,
                "group.id": f'{topic}-group',
                "auto.offset.reset": "earliest",
                "enable.auto.commit": True,
            }
        )

        self.consumer.subscribe([self.topic], on_assign=self._on_assign, on_revoke=self._on_revoke)

        signal.signal(signal.SIGINT, self._signal_handler)
        signal.signal(signal.SIGTERM, self._signal_handler)

    def _on_assign(self, consumer, partitions: List[TopicPartition]):
        logger.info(f"[Consumer] Partitions assigned: {partitions}")
        consumer.assign(partitions)

    def _on_revoke(self, consumer, partitions: List[TopicPartition]):
        logger.info(f"[Consumer] Partitions revoked: {partitions}")
        consumer.unassign()

    def _signal_handler(self, signum, frame):
        logger.info(f"[Consumer] Received signal {signum}, stopping...")
        self.stop_event.set()

    def consume(self) -> Generator[RecordMessage, None, None]:
        """
        Continuously yield new consumed RecordMessage from Kafka.
        """
        try:
            while not self.stop_event.is_set():
                msgs = self.consumer.consume(num_messages=self.batch_size, timeout=self.poll_timeout)
                if not msgs:
                    continue

                for msg in msgs:
                    if msg is None:
                        continue
                    if msg.error():
                        raise KafkaException(msg.error())

                    try:
                        yield RecordMessage.model_validate_json(msg.value().decode())
                    except KafkaException:
                        logger.exception(f"[Consumer] Failed to parse message")
        finally:
            logger.info("[Consumer] Closing consumer...")
            self.consumer.close()
