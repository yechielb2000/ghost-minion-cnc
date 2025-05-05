from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, constr


class DataBase(BaseModel):
    agent_id: UUID
    task_id: UUID
    data: bytes
    collected_at: datetime
    stored_at: datetime
    data_type: constr(strip_whitespace=True)


class DataCreate(DataBase):
    pass


class DataRead(DataBase):
    id: UUID

    class Config:
        orm_mode = True
