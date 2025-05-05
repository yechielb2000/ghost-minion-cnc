from typing import Optional

from fastapi import APIRouter, Depends

from cnc.auth.validate_agent import validate_token

agent_router = APIRouter(
    prefix="/agent",
    dependencies=[Depends(validate_token)]
)


@agent_router.get(path="install")
async def install_agent(password: str, version: Optional[str] = None):
    """
    Get latest version of agent. If version is provided, it will install the specified version.
    If the specified version is not available, it will return None.
    To install anything you must provide a password. The password is unique per each agent, configured by user.
    """
    pass
