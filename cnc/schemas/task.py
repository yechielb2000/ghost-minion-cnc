from enum import Enum
from uuid import UUID

from pydantic import BaseModel, Field


class TaskStatus(str, Enum):
    EXECUTED = "EXECUTED"
    PENDING = "PENDING"
    SENT = "SENT"


class TaskBase(BaseModel):
    agent_id: UUID
    payload: bytes
    priority: int = Field(..., ge=1, le=10)
    status: TaskStatus


class TaskCreate(TaskBase):
    pass


class TaskRead(TaskBase):
    id: UUID

    class Config:
        orm_mode = True
