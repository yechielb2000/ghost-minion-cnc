from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class Agent(BaseModel):
    first_seen: datetime
    last_seen: datetime


class AgentCreate(BaseModel):
    pass


class AgentRead(BaseModel):
    id: UUID

    class Config:
        orm_mode = True
