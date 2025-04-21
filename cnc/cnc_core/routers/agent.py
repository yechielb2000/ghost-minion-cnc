from typing import Optional

from fastapi import APIRouter, Depends
from redis.asyncio import Redis

from cnc.cnc_core.redis_connect import get_redis

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


@agent_router.get(path="challenge/{agent_id}/{key}")
async def challenge_agent(agent_id: str, key: str, redis: Redis = Depends(get_redis)):
    """
    As an agent you must answer a challenge before making any other action.
    After succeeding this challenge it can send data and receive its new tasks.
    """
    # TODO: Check if key is equivalent to the agent key in the db.
    # after accepting the challenge we update redis key of this agent to be authorized.
    await redis.set(f'{agent_id}_auth', True, ex=300)
