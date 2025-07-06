from uuid import UUID

from pydantic import BaseModel, Field

from shared.models import TaskStatus


class Task(BaseModel):
    agent_id: UUID
    payload: bytes
    priority: int = Field(..., ge=1, le=10)
    status: TaskStatus


class TaskCreate(Task):
    pass


class TaskUpdate(BaseModel):
    id: UUID
    payload: bytes = None
    status: TaskStatus = None


class TaskRead(Task):
    id: UUID

    class Config:
        orm_mode = True
