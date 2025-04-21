from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI

from db_adapters.cnc_redis.connect import create_redis_connection


@asynccontextmanager
async def lifespan(a: FastAPI):
    load_dotenv()
    await create_redis_connection(a)
    yield


app = FastAPI(lifespan=lifespan)


@app.get("/agent-auth")
async def is_agent_auth(agent_id: str) -> bool:
    is_authorized = await app.state.redis.get(f'{agent_id}_auth')
    return is_authorized


@app.post("/agent-auth")
async def set_agent_auth(agent_id: str):
    await app.state.redis.set(f'{agent_id}_auth', True, ex=300)
