from typing import List

from fastapi import APIRouter, Depends


from shared.adapters import get_tasks_db
from services.task_crud.controller import TaskController
from shared.schemas.task import TaskUpdate, TaskBase

router = APIRouter(
    prefix="/tasks",
)


@router.get("", response_model=TaskBase)
def get_tasks(agent_id: str, tasks_db: TaskController = Depends(get_tasks_db)):
    try:
        tasks = tasks_db.get_agent_tasks(agent_id)
    except Exception as e:
        return {"error": str(e)}
    return tasks


@router.put("")
def update_tasks(tasks: List[TaskUpdate], tasks_db: TaskController = Depends(get_tasks_db)):
    try:
        tasks_db.update_tasks(tasks)
        return None
    except Exception as e:
        return {"error": str(e)}


@router.put("/{id}")
def update_tasks(task: TaskUpdate, tasks_db: TaskController = Depends(get_tasks_db)):
    try:
        tasks_db.update_tasks([task])
        return None
    except Exception as e:
        return {"error": str(e)}
