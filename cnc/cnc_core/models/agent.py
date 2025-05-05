import uuid

from sqlalchemy import Column, UUID, TIMESTAMP, LargeBinary, Boolean, text
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Agent(Base):
    __tablename__ = "agents"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    first_seen = Column(TIMESTAMP, index=True, server_default=text("CURRENT_TIMESTAMP"))
    last_seen = Column(TIMESTAMP, index=True, server_default=text("CURRENT_TIMESTAMP"))
    challenge_key = Column(LargeBinary)
    is_alive = Column(Boolean, nullable=False, default=True)
