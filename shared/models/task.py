import datetime
import enum
import uuid

from sqlalchemy import Column, Integer, Index, CheckConstraint, LargeBinary, UUID, Enum, TIMESTAMP, text
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class TaskStatus(str, enum.Enum):
    EXECUTED = "EXECUTED"
    PENDING = "PENDING"
    SENT = "SENT"
    FAILED = "FAILED"
    EXPIRED = "EXPIRED"


class TaskModel(Base):
    __tablename__ = "tasks"

    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    agent_id = Column(UUID, nullable=False)
    payload = Column(LargeBinary, nullable=False)
    priority = Column(Integer, nullable=False)
    status = Column(Enum(TaskStatus), nullable=False, default=TaskStatus.PENDING)
    expire_time = Column(
        TIMESTAMP,
        nullable=False,
        default=lambda: datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=1)
    )

    __table_args__ = (
        CheckConstraint('priority BETWEEN 1 AND 10', name='check_priority_range'),
        Index("idx_tasks_agent_id", "agent_id"),
    )
