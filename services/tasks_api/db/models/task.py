import datetime
import enum
import uuid

from sqlalchemy import LargeBinary, Enum
from sqlmodel import Field, SQLModel, Column


class TaskStatus(str, enum.Enum):
    EXECUTED = "EXECUTED"
    PENDING = "PENDING"
    SENT = "SENT"
    FAILED = "FAILED"
    EXPIRED = "EXPIRED"


class Task(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=False)
    agent_id: uuid.UUID = Field(index=True, nullable=False)
    payload: bytes = Field(sa_column=Column(LargeBinary, nullable=False))
    priority: int = Field(nullable=False, le=10, ge=1)
    status: TaskStatus = Field(
        sa_column=Column(Enum(TaskStatus), nullable=False, default=TaskStatus.PENDING),
        default=TaskStatus.PENDING,
    )
    expire_time: datetime.datetime = Field(
        default_factory=lambda: datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=1),
        nullable=False,
    )


class TaskCreate(SQLModel):
    agent_id: uuid.UUID
    payload: bytes
    priority: int
    status: TaskStatus | None = TaskStatus.PENDING
    expire_time: datetime.datetime | None = None


class TaskRead(SQLModel):
    id: uuid.UUID
    agent_id: uuid.UUID
    priority: int
    status: TaskStatus
    expire_time: datetime.datetime


class TaskUpdate(SQLModel):
    priority: int | None = None
    status: TaskStatus | None = None
    expire_time: datetime.datetime | None = None
