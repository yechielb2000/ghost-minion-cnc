from fastapi import APIRouter, Depends

from cnc import schemas
from cnc.adapters import get_tasks_db
from cnc.auth.validate_agent import validate_token
from cnc.controllers.task import TaskController

tasks_router = APIRouter(
    prefix="/tasks",
    dependencies=[Depends(validate_token)]
)


@tasks_router.get("", response_model=schemas.TaskBase)
def get_tasks(agent_id: str, tasks_db: TaskController = Depends(get_tasks_db)):
    tasks = tasks_db.get_agent_tasks(agent_id)
    return tasks
