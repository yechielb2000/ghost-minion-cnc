from __future__ import annotations

import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel

from shared.models.data import DataType, OSType


class DataMetadata(BaseModel):
    id: UUID
    agent_id: UUID
    task_id: UUID
    collected_at: datetime.datetime
    data_type: DataType
    os_type: OSType
    stored_at: datetime.datetime | None = None
    extra: dict[str, Any] = {}

    class Config:
        orm_mode = True


class DataBase(DataMetadata):
    data: bytes


class DataCreate(DataBase):
    pass


class DataRead(DataBase):
    id: UUID
