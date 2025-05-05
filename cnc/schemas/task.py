from uuid import UUID

from pydantic import BaseModel, Field

from cnc.models.task import TaskStatus


class TaskBase(BaseModel):
    agent_id: UUID
    payload: bytes
    priority: int = Field(..., ge=1, le=10)
    status: TaskStatus


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    id: UUID
    payload: bytes = None
    status: TaskStatus = None


class TaskRead(TaskBase):
    id: UUID

    class Config:
        orm_mode = True
