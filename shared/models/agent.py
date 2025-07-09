import datetime
import uuid

from sqlalchemy import Column, UUID, TIMESTAMP, LargeBinary, Boolean, text, ARRAY, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class AgentModel(Base):
    __tablename__ = "agents"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    first_seen = Column(TIMESTAMP, index=True, default=datetime.datetime.now(datetime.UTC))
    last_seen = Column(TIMESTAMP, index=True, default=datetime.datetime.now(datetime.UTC))
    challenge_key = Column(LargeBinary)
    is_alive = Column(Boolean, nullable=False, default=True)
    tags = Column(ARRAY(String), nullable=False, default=list, server_default=text("'{}'"))
    version = Column(String, nullable=True)
    type = Column(String, nullable=True)
    description = Column(String, nullable=True)
