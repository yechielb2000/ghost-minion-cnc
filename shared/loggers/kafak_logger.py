import datetime
import json
import logging

from confluent_kafka import Producer


class KafkaLoggingHandler(logging.Handler):
    def __init__(self, kafka_bootstrap_servers, topic):
        super().__init__()
        self.topic = topic
        self.producer = Producer({'bootstrap.servers': kafka_bootstrap_servers})

    def emit(self, record):
        try:
            log_entry = {
                'timestamp': datetime.datetime.now(datetime.UTC).isoformat(),
                'level': record.levelname,
                'logger': record.name,
                'message': record.getMessage(),
                'pathname': record.pathname,
                'lineno': record.lineno,
                'funcName': record.funcName,
                'process': record.process,
                'thread': record.threadName,
            }
            msg = json.dumps(log_entry)
            self.producer.produce(self.topic, msg.encode('utf-8'))
            self.producer.poll(0)
        except Exception:
            self.handleError(record)

    def flush(self):
        self.producer.flush()


def setup_kafka_logger(*, logger_name: str = None, kafka_bootstrap_servers: str, topic: str) -> logging.Logger:
    logger = logging.getLogger(logger_name)
    logger.setLevel(logging.DEBUG)
    kafka_handler = KafkaLoggingHandler(kafka_bootstrap_servers, topic)
    logger.addHandler(kafka_handler)
    return logger
