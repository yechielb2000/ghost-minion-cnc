from typing import Optional

from fastapi import APIRouter, Depends
from redis.asyncio import Redis

from pydantic import BaseModel

agent_router = APIRouter(
    prefix="/agent",
)


@agent_router.get(path="install")
async def install_agent(password: str, version: Optional[str] = None):
    """
    Get latest version of agent. If version is provided, it will install the specified version.
    If the specified version is not available, it will return None.
    To install anything you must provide a password. The password is unique per each agent, configured by user.
    """
    pass


@agent_router.post(path="register")
async def register_agent():
    """Register new agent, add new agent record."""
    pass


class Challenge(BaseModel):
    agent_id: str
    key: str


@agent_router.post(path="challenge")
async def challenge_agent(challenge: Challenge):
    """
    As an agent you must answer a challenge before making any other action.
    After succeeding this challenge it can send data and receive its new tasks.
    """

