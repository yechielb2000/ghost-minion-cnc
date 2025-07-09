from typing import Sequence, List

from fastapi import Depends
from sqlalchemy import insert, select, update, delete
from sqlalchemy.orm import Session

from services.task_crud.db import get_tasks_db
from shared.models.task import TaskModel, TaskStatus
from shared.schemas.task import TaskCreate, TaskUpdate


class TaskController:
    def __init__(self, tasks_db: Session):
        self.tasks_db = tasks_db

    def create_task(self, task: TaskCreate) -> None:
        stmt = insert(TaskModel)
        self.tasks_db.execute(stmt, task.model_dump())
        self.tasks_db.commit()

    def delete_task(self, task_id: int) -> None:
        stmt = delete(TaskModel).where(TaskModel.id == task_id)
        self.tasks_db.execute(stmt)
        self.tasks_db.commit()

    def get_agent_tasks(self, agent_id: str) -> Sequence[TaskModel]:
        stmt = (
            select(TaskModel)
            .where(TaskModel.agent_id == agent_id, TaskModel.status == TaskStatus.PENDING)
            .order_by(TaskModel.priority.desc())
        )
        tasks = self.tasks_db.execute(stmt).scalars().all()
        return tasks

    def update_tasks(self, tasks: List[TaskUpdate]) -> None:
        for task in tasks:
            stmt = (
                update(TaskModel).
                where(TaskModel.id == task.id).
                values(**task.model_dump(exclude_none=True))
            )
            self.tasks_db.execute(stmt)
        self.tasks_db.commit()


def get_task_controller(tasks_db=Depends(get_tasks_db)):
    return TaskController(tasks_db)
