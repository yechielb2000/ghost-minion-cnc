from datetime import datetime
from typing import Optional, Dict
from uuid import UUID

from pydantic import BaseModel

from shared.models.data import DataType, OSType


# TODO: should create DataUpdate

class DataMetadata(BaseModel):
    id: UUID
    agent_id: UUID
    task_id: UUID
    collected_at: datetime
    data_type: DataType
    os_type: OSType
    stored_at: Optional[datetime] = None
    extra: Dict[str, any] = {}

    class Config:
        orm_mode = True


class DataBase(DataMetadata):
    data: bytes


class DataCreate(DataBase):
    pass


class DataRead(DataBase):
    id: UUID
