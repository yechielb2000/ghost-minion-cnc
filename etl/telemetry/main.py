import json

from etl.base_consumer import GenericConsumer
from shared.data_type_models.telemetry import TelemetryCreate
from shared.etl_dtos.data_types import DataType


def main():
    consumer = GenericConsumer(parser_group='telemetry-group', topic=DataType.TELEMETRY)
    for record in consumer.consume():
        raw_telemetry = json.loads(record.data)
        # check if telemetry already exists, if yes, just update.
        telemetry = TelemetryCreate(
            agent_id=record.agent_id,
        )
        TelemetryCreate.model_validate_json(record.data)


if __name__ == '__main__':
    main()
