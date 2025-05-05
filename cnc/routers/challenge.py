import secrets
from http import HTTPStatus

from fastapi import APIRouter, Depends
from fastapi import HTTPException

from cnc.adapters.redis import get_redis
from cnc.auth.validate_agent import ChallengeRequest, EXPECTED_KEY, TOKEN_EXPIRATION_SECONDS, ChallengeResponse

challenge_router = APIRouter(
    prefix="/challenge",
)


@challenge_router.post("", response_model=ChallengeResponse)
def challenge(request: ChallengeRequest, redis_client=Depends(get_redis)):
    if request.key != EXPECTED_KEY:
        raise HTTPException(status_code=HTTPStatus.FORBIDDEN)

    token = secrets.token_urlsafe(nbytes=32)
    redis_client.setex(f"{request.agent_id}_token:{token}", TOKEN_EXPIRATION_SECONDS, "valid")

    return ChallengeResponse(access_token=token)
