from __future__ import annotations

import datetime
from typing import Any

from pydantic import BaseModel, Field

from shared.etl_dtos.data_types import DataType


class RecordMessage(BaseModel):
    record_id: str
    agent_id: str
    task_id: str
    collected_at: datetime.datetime = Field(default_factory=lambda: datetime.datetime.now(datetime.UTC))
    data: bytes
    data_type: DataType
    extra: dict[str, Any] = {}
