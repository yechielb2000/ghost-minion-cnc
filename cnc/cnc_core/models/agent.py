import uuid
from datetime import datetime

from sqlalchemy import Column, UUID, TIMESTAMP
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Agent(Base):
    __tablename__ = "agents"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    first_seen = Column(TIMESTAMP, index=True, default=datetime.timestamp)
    last_seen = Column(TIMESTAMP, index=True, default=datetime.timestamp)
