from typing import List

from fastapi import APIRouter, Depends

from cnc.auth.validate_agent import validate_token
from shared.adapters import get_tasks_db
from shared.controllers.task import TaskController
from shared.schemas.task import TaskUpdate, TaskBase

tasks_router = APIRouter(
    prefix="/tasks",
    dependencies=[Depends(validate_token)]
)


@tasks_router.get("", response_model=TaskBase)
def get_tasks(agent_id: str, tasks_db: TaskController = Depends(get_tasks_db)):
    try:
        tasks = tasks_db.get_agent_tasks(agent_id)
    except Exception as e:
        return {"error": str(e)}
    return tasks


@tasks_router.put("")
def update_tasks(tasks: List[TaskUpdate], tasks_db: TaskController = Depends(get_tasks_db)):
    try:
        tasks_db.update_tasks(tasks)
        return None
    except Exception as e:
        return {"error": str(e)}


@tasks_router.put("/{id}")
def update_tasks(task: TaskUpdate, tasks_db: TaskController = Depends(get_tasks_db)):
    try:
        tasks_db.update_tasks([task])
        return None
    except Exception as e:
        return {"error": str(e)}
