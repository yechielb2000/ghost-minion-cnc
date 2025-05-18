from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, constr


class DataBase(BaseModel):
    agent_id: UUID
    task_id: UUID
    data: bytes
    collected_at: datetime
    stored_at: Optional[datetime] = None
    data_type: constr(strip_whitespace=True)


class DataCreate(DataBase):
    pass


class DataRead(DataBase):
    id: UUID

    class Config:
        orm_mode = True
