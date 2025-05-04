from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from redis import Redis

from cnc.cnc_core.redis_connect import create_redis_connection

TASK_KEY_FORMAT = '{agent_id}_tasks'


@asynccontextmanager
async def redis_connection(a: FastAPI):
    load_dotenv()
    a.state.redis: Redis = await create_redis_connection()
    yield


app = FastAPI(lifespan=redis_connection)


@app.get('tasks')
async def get_tasks(agent_id: str):
    key = TASK_KEY_FORMAT.format(agent_id=agent_id)
    tasks = await app.state.redis.lpop(key, -1)
    return tasks


@app.post('tasks')
async def set_tasks(agent_id: str):
    key = TASK_KEY_FORMAT.format(agent_id=agent_id)
    app.state.redis.lpush()
    pass
