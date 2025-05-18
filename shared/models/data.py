import uuid
from datetime import datetime

from sqlalchemy import Column, String, TIMESTAMP, Index, LargeBinary, UUID, text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Data(Base):
    __tablename__ = "data"

    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    agent_id = Column(UUID, nullable=False)
    task_id = Column(UUID, nullable=False)
    data = Column(LargeBinary, nullable=False)
    data_type = Column(String, nullable=False)
    collected_at = Column(TIMESTAMP, nullable=False, server_default=text("CURRENT_TIMESTAMP"))
    stored_at = Column(TIMESTAMP, nullable=False, server_default=text("CURRENT_TIMESTAMP"))

    __table_args__ = (
        Index("idx_data_agent_id", "agent_id"),
        Index("idx_data_task_id", "task_id"),
        Index("idx_data_type", "data_type"),
    )
