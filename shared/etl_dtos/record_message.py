from __future__ import annotations
import uuid
import datetime
from typing import Any, AnyStr

from pydantic import BaseModel, Field

from shared.etl_dtos.data_types import DataType


class RecordMessage(BaseModel):
    parent_record_id: uuid.UUID | None = None
    record_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    agent_id: str
    task_id: str
    collected_at: datetime.datetime = Field(default_factory=lambda: datetime.datetime.now(datetime.UTC))
    data: bytes
    data_type: DataType | str
    extra: dict[str, Any] = {}

    def create_child_record(self, data: bytes, data_type: DataType | str, extra: dict[str, Any] = None) -> RecordMessage:
        return RecordMessage(
            parent_record_id=self.record_id,
            record_id=uuid.uuid4(),
            agent_id=self.agent_id,
            task_id=self.task_id,
            collected_at=datetime.datetime.now(datetime.UTC),
            data=data,
            data_type=data_type,
            extra=extra or {},
        )