from datetime import datetime
from typing import Optional, List
from uuid import UUID

from pydantic import BaseModel, Field


class AgentBase(BaseModel):
    id: UUID
    challenge_key: bytes
    is_alive: bool = True
    tags: List[str] = Field(default_factory=list)
    version: Optional[str] = None
    type: Optional[str] = None
    description: Optional[str] = None


class AgentCreate(AgentBase):
    pass


class AgentUpdate(BaseModel):
    last_seen: Optional[datetime] = None
    is_alive: Optional[bool] = None
    tags: Optional[List[str]] = None
    version: Optional[str] = None
    type: Optional[str] = None
    description: Optional[str] = None
    challenge_key: Optional[bytes] = None

class AgentUpsert(AgentUpdate):
    id: Optional[UUID] = None


class AgentRead(AgentBase):
    first_seen: datetime
    last_seen: datetime

    class Config:
        orm_mode = True
