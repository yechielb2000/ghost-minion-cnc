from abc import abstractmethod

from loguru import logger

from shared.etl_dtos.data_types import DataType
from shared.etl_dtos.record_message import RecordMessage
from shared.kafka.consumer import RecordConsumer
from shared.kafka.producer import RecordProducer


class BaseParser:
    def __init__(self):
        self.consumer = RecordConsumer(topic=self.topic)
        self.producer = RecordProducer()

    @property
    @abstractmethod
    def topic(self) -> DataType:
        """Implement this property to return the Kafka topic to consume from."""
        raise NotImplementedError

    @abstractmethod
    def handle_record(self, record) -> list[RecordMessage] | RecordMessage:
        """
        Process a single consumed record and return one or more products.
        """
        raise NotImplementedError

    def run(self):
        logger.info(f"{self.__class__.__name__} started consuming...")

        for record in self.consumer.consume():
            try:
                products = self.handle_record(record)
            except Exception as e:
                logger.exception(f"Error handling record: {e}")
                continue
            if products is None:
                continue
            elif not isinstance(products, (list, tuple)):
                products = [products]

            for product in products:
                try:
                    self.producer.produce(product.data_type, product)
                except Exception as e:
                    logger.exception(f"Error producing product record: {e}")

        logger.info(f"{self.__class__.__name__} finished consuming.")
