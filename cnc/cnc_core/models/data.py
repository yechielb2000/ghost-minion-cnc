import uuid
from datetime import datetime
from sqlalchemy import Column, String, TIMESTAMP, BYTEA, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Data(Base):
    __tablename__ = "data"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_id = Column(UUID(as_uuid=True), nullable=False)
    task_id = Column(UUID(as_uuid=True), nullable=False)
    data = Column(BYTEA, nullable=False)
    data_type = Column(String, nullable=False)
    collected_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)
    stored_at = Column(TIMESTAMP, nullable=False, default=datetime.utcnow)

    __table_args__ = (
        Index("idx_data_agent_id", "agent_id"),
        Index("idx_data_task_id", "task_id"),
        Index("idx_data_type", "data_type"),
    )