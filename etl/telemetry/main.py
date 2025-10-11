from etl.base_parser import BaseParser
from shared.data_type_models.telemetry import TelemetryCreate
from shared.etl_dtos.data_types import DataType
from shared.etl_dtos.record_message import RecordMessage


class TelemetryParser(BaseParser):

    @property
    def topic(self) -> DataType:
        return DataType.TELEMETRY

    def handle_record(self, record: RecordMessage) -> RecordMessage:
        telemetry = TelemetryCreate(agent_id=record.agent_id)
        telemetry_db_writer_data_type = f'{record.data_type}-db-writer'
        child_record = record.create_child_record(telemetry.model_dump_json().encode(), telemetry_db_writer_data_type)
        return child_record
