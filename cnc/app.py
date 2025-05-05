from contextlib import asynccontextmanager

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI

from cnc.adapters import pg_dbs
from cnc.adapters.mq import flush_producer
from cnc.routers.challenge import challenge_router
from cnc.routers.tasks import tasks_router


@asynccontextmanager
async def lifespan(a: FastAPI):
    load_dotenv()
    for base, engine in pg_dbs:
        async with engine.begin() as conn:
            await conn.run_sync(base.metadata.create_all)
    yield
    flush_producer()


app = FastAPI(lifespan=lifespan)

app.include_router(challenge_router)
app.include_router(tasks_router)

if __name__ == '__main__':
    uvicorn.run("cnc:app", host="0.0.0.0", port=8000)
