import json

from confluent_kafka import Producer

from shared.utils import load_kafka_config

producer: Producer | None = None

def get_kafka_producer() -> Producer:
    global producer
    if not producer:
        config = load_kafka_config("kafka_producer.conf")
        return Producer(**config)
    return producer


def flush_producer():
    global producer
    if producer:
        producer.flush()


def delivery_callback(err, msg):
    # TODO: remember to switch to log messages
    if err:
        print(f"Delivery failed: {err}")
    else:
        print(f"Delivered to {msg.topic()} [{msg.partition()}]")


def send_to_kafka(prdcr: Producer, topic: str, key: str, value: dict):
    """
    Send a JSON-serializable message to Kafka.

    Args:
      prdcr: confluent_kafka.Producer instance
      topic: Kafka topic name (str)
      key: Message key (str)
      value: Message value as dict (will be JSON serialized)
    """
    try:
        prdcr.produce(topic=topic, key=key, value=json.dumps(value))
        prdcr.poll(0)
    except Exception as e:
        # TODO: change to real log message
        print(f"[Kafka send error] topic={topic} key={key} error={e}")
        raise