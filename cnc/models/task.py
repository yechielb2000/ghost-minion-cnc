import uuid

from sqlalchemy import Column, Integer, Boolean, Index, CheckConstraint, LargeBinary, UUID
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Task(Base):
    __tablename__ = "tasks"

    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    agent_id = Column(UUID, nullable=False)
    payload = Column(LargeBinary, nullable=False)
    priority = Column(Integer, nullable=False)
    sent = Column(Boolean, nullable=False, default=False)
    executed = Column(Boolean, nullable=False, default=False)

    __table_args__ = (
        CheckConstraint('priority BETWEEN 1 AND 10', name='check_priority_range'),
        Index("idx_tasks_agent_id", "agent_id"),
    )
