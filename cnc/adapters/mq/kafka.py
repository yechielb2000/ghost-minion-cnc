from confluent_kafka import Producer

producer: Producer | None = None


def load_kafka_config(path: str) -> dict:
    config = {}
    with open(path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#"):
                k, v = line.split("=", 1)
                config[k.strip()] = v.strip()
    return config


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
