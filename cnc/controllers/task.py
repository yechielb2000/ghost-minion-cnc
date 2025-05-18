from typing import Sequence, List

from sqlalchemy import insert, select, update, delete
from sqlalchemy.orm import Session

from shared import models, schemas


class TaskController:
    def __init__(self, tasks_db: Session):
        self.tasks_db = tasks_db

    def create_task(self, task: schemas.TaskCreate) -> None:
        stmt = insert(models.Task)
        self.tasks_db.execute(stmt, task.model_dump())
        self.tasks_db.commit()

    def delete_task(self, task_id: int) -> None:
        stmt = delete(models.Task).where(models.Task.id == task_id)
        self.tasks_db.execute(stmt)
        self.tasks_db.commit()

    def get_agent_tasks(self, agent_id: str) -> Sequence[models.Task]:
        stmt = (
            select(models.Task)
            .where(models.Task.agent_id == agent_id, models.Task.status == models.TaskStatus.PENDING)
            .order_by(models.Task.priority.desc())
        )
        tasks = self.tasks_db.execute(stmt).scalars().all()
        return tasks

    def update_tasks(self, tasks: List[schemas.TaskUpdate]) -> None:
        for task in tasks:
            stmt = (
                update(models.Task).
                where(models.Task.id == task.id).
                values(**task.model_dump(exclude_none=True))
            )
            self.tasks_db.execute(stmt)
        self.tasks_db.commit()
