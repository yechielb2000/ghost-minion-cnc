from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI

from cnc.adapters import dbs


@asynccontextmanager
async def lifespan(a: FastAPI):
    load_dotenv()
    for base, engine in dbs:
        async with engine.begin() as conn:
            await conn.run_sync(base.metadata.create_all)
    yield


app = FastAPI(lifespan=lifespan)
