import uuid
from contextlib import asynccontextmanager

import uvicorn
from fastapi import Depends, FastAPI, status
from fastapi.responses import JSONResponse

from services.tasks_api.db import init_db
from services.tasks_api.db.controller import TaskController, get_controller
from services.tasks_api.db.models import TaskStatus, TaskRead, TaskUpdate, TaskCreate


@asynccontextmanager
async def lifespan(a: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan)


@app.post("/tasks", response_model=list[TaskRead])
def create_task(tasks: list[TaskCreate], tasks_db: TaskController = Depends(get_controller)):
    try:
        created = []
        for task in tasks:
            created.append(tasks_db.create_task(task))
        return created
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@app.get("/tasks", response_model=TaskRead, description="Get tasks by agent_id and task_status")
def get_tasks(
        agent_id: uuid.UUID,
        task_status: TaskStatus = TaskStatus.PENDING,
        tasks_db: TaskController = Depends(get_controller)
):
    try:
        return tasks_db.get_tasks(agent_id=agent_id, task_status=task_status)
    except Exception as e:
        # TODO: add log message
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@app.delete("/tasks/{task_id}")
def delete_tasks(task_id: uuid.UUID, tasks_db: TaskController = Depends(get_controller)):
    try:
        return tasks_db.delete_task(task_id)
    except Exception as e:
        # TODO: add log message
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@app.put("/tasks/{task_id}")
def update_tasks(task_id: uuid.UUID, updated_task: TaskUpdate, tasks_db: TaskController = Depends(get_controller)):
    try:
        return tasks_db.update_task(task_id, updated_task)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


if __name__ == '__main__':
    uvicorn.run("tasks_api:app", host="0.0.0.0", port=8000)
