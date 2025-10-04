from shared.logger.kafka_logger import setup_kafka_logger

logger = None


def setup_logger():
    global logger
    logger = setup_kafka_logger(
        kafka_bootstrap_servers='localhost:9092',
        topic='data-receiver-logs',
        logger_name='data-receiver-logger',
    )
    return logger

def get_logger():
    global logger
    if logger is None:
        logger = setup_logger()
    return logger
