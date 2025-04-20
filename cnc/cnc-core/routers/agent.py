from typing import Optional

from fastapi import APIRouter

provisioner_router = APIRouter(
    prefix="/agent",
)


@provisioner_router.get(path="install")
async def install_agent(version: Optional[str] = None):
    """
    Get latest version of agent. If version is provided, it will install the specified version.
    If the specified version is not available, it will return None.
    """
    pass


@provisioner_router.get(path="register")
async def register_agent():
    """Register new agent, add new agent record."""
    pass

