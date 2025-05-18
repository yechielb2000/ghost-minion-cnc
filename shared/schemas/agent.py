from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AgentBase(BaseModel):
    first_seen: datetime
    last_seen: datetime
    challenge_key: bytes
    is_alive: bool


class AgentCreate(AgentBase):
    pass


class AgentUpdate(BaseModel):
    last_seen: Optional[datetime] = None
    is_alive: Optional[bool] = None


class AgentRead(AgentBase):
    class Config:
        orm_mode = True
