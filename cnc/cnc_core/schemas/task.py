from uuid import UUID

from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    agent_id: UUID
    payload: bytes
    priority: int = Field(..., ge=1, le=10)
    sent: bool = False


class TaskCreate(TaskBase):
    pass


class TaskRead(TaskBase):
    id: UUID

    class Config:
        orm_mode = True
