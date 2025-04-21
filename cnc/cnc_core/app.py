from contextlib import asynccontextmanager

from fastapi import FastAPI
from dotenv import load_dotenv

from cnc.cnc_core.redis_connect import create_redis_connection
from cnc.cnc_core.routers.agent import agent_router

@asynccontextmanager
async def lifespan(a: FastAPI):
    load_dotenv()
    await create_redis_connection(a)
    yield

app = FastAPI()

app.include_router(agent_router)
