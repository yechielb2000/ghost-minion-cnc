from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI

from services.agent_crud.db import AgentsBase, agents_engine
from services.agent_crud.router import router


@asynccontextmanager
async def lifespan(a: FastAPI):
    async with agents_engine.begin() as conn:
        await conn.run_sync(AgentsBase.metadata.create_all)
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(router)

if __name__ == '__main__':
    uvicorn.run("cnc:app", host="0.0.0.0", port=8181)
