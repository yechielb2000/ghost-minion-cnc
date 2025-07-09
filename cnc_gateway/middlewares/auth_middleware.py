from http import HTTPStatus
from urllib.request import Request

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

from redis_client import get_redis


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        redis_client = await get_redis()
        agent_id = request.headers.get("X-Agent-ID")
        if not agent_id:
            return Response(status_code=HTTPStatus.NO_CONTENT)
        is_allowed = await redis_client.get(f"agent:{agent_id}")
        if not is_allowed:
            return Response(status_code=HTTPStatus.NO_CONTENT)
        return await call_next(request)
