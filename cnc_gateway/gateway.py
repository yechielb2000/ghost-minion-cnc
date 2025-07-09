from contextlib import asynccontextmanager
from http import HTTPStatus

from aiohttp import ClientSession
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

from balancer import get_next_data_upstream, get_next_task_upstream
from middlewares.auth_middleware import AuthMiddleware
from redis_client import get_redis, Redis

redis_client: Redis
http_client: ClientSession


@asynccontextmanager
async def lifespan(a: FastAPI):
    global redis_client, http_client
    redis_client = await get_redis()
    http_client = ClientSession()
    yield
    await redis_client.close()
    await http_client.close()


app = FastAPI(lifespan=lifespan)

limiter = Limiter(key_func=lambda r: r.headers.get("X-Agent-ID", get_remote_address(r)))

app.state.limiter = limiter
app.add_exception_handler(HTTPStatus.TOO_MANY_REQUESTS, _rate_limit_exceeded_handler)

app.add_middleware(AuthMiddleware)


@app.post("/auth")
async def authorize_agent(agent_id: str):
    """Allow an agent to communicate (stores it in Redis with TTL)."""
    await redis_client.set(f"agent:{agent_id}", "1", ex=900)
    return {"status": "authorized", "agent_id": agent_id}


@app.get("/tasks")
@limiter.limit("5/second")
async def proxy_tasks(request: Request):
    upstream = await get_next_task_upstream()
    headers = dict(request.headers)
    async with http_client.get(f"{upstream}/tasks", headers=headers) as resp:
        content = await resp.read()
        return JSONResponse(content=content, status_code=resp.status)


@app.post("/data")
@limiter.limit("10/second")
async def proxy_data(request: Request):
    upstream = await get_next_data_upstream()
    headers = dict(request.headers)
    body = await request.body()
    async with http_client.post(f"{upstream}/data", data=body, headers=headers) as resp:
        content = await resp.read()
        return JSONResponse(content=content, status_code=resp.status)
