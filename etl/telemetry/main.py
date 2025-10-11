import json

from shared.kafka.consumer import RecordConsumer
from shared.data_type_models.telemetry import TelemetryCreate
from shared.etl_dtos.data_types import DataType


def main():
    consumer = RecordConsumer(topic=DataType.TELEMETRY)
    for record in consumer.consume():
        telemetry = TelemetryCreate(agent_id=record.agent_id)
        telemetry_record = record.create_child_record(
            data=telemetry.model_dump_json().encode(),
            data_type=DataType.TELEMETRY
        )


if __name__ == '__main__':
    main()
