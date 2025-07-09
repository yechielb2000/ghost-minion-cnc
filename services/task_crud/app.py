from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI

from services.task_crud.db import TasksBase, tasks_engine
from services.task_crud.router import router


@asynccontextmanager
async def lifespan(a: FastAPI):
    async with tasks_engine.begin() as conn:
        await conn.run_sync(TasksBase.metadata.create_all)
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(router)

if __name__ == '__main__':
    uvicorn.run("task_crud:app", host="0.0.0.0", port=8182)
