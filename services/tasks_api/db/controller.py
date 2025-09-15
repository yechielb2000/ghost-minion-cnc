from __future__ import annotations

import uuid

from fastapi import Depends
from sqlmodel import Session, select

from services.tasks_api.db import get_session
from services.tasks_api.db.models import (
    Task,
    TaskCreate,
    TaskRead,
    TaskStatus,
    TaskUpdate,
)


class TaskController:
    def __init__(self, tasks_db: Session):
        self.session = tasks_db

    def create_task(self, task: TaskCreate) -> TaskRead:
        self.session.add(task)
        self.session.commit()
        self.session.refresh(task)
        return TaskRead.model_validate(task)

    def get_task(self, task_id: uuid.UUID) -> TaskRead | None:
        task = self.session.get(Task, task_id)
        if task:
            TaskRead.model_validate(task)
        return task

    def delete_task(self, task_id: uuid.UUID) -> None:
        task = self.get_task(task_id)
        self.session.delete(task)
        self.session.commit()

    def get_tasks(self, agent_id: uuid.UUID, task_status: TaskStatus = TaskStatus.PENDING) -> list[TaskRead]:
        stmt = (
            select(Task)
            .where((Task.agent_id == agent_id) & (Task.status == task_status))
            .order_by(Task.priority.desc())
        )
        return self.session.exec(stmt).all()

    def update_task(self, task_id: uuid.UUID, updated_task: TaskUpdate) -> TaskRead | None:
        task = self.get_task(task_id)
        task_data_dict = updated_task.model_dump(exclude_none=True)
        for key, value in task_data_dict.items():
            setattr(task, key, value)
        self.session.commit()


def get_controller(session: Session = Depends(get_session)) -> TaskController:
    return TaskController(session)
