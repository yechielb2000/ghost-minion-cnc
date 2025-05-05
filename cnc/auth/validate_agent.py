import os
from http import HTTPStatus

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

from cnc.adapters.redis import get_redis

EXPECTED_KEY = os.getenv("CNC_CHALLENGE_KEY")
TOKEN_EXPIRATION_SECONDS = 900

auth_scheme = HTTPBearer()


class ChallengeRequest(BaseModel):
    agent_id: str
    key: str


class ChallengeResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int = TOKEN_EXPIRATION_SECONDS


def validate_token(
        agent_id: str,
        credentials: HTTPAuthorizationCredentials = Depends(auth_scheme),
        redis_client=Depends(get_redis)
):
    token = credentials.credentials
    if not redis_client.exists(f"{agent_id}_token:{token}"):
        raise HTTPException(status_code=HTTPStatus.FORBIDDEN)
