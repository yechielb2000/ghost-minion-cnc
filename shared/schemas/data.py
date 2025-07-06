from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, constr

class Data(BaseModel):
    agent_id: UUID
    task_id: UUID
    data: bytes
    collected_at: datetime
    stored_at: Optional[datetime] = None
    data_type: constr(strip_whitespace=True)


class DataCreate(Data):
    pass


class DataRead(Data):
    id: UUID

    class Config:
        orm_mode = True
