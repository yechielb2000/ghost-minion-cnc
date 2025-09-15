from typing import Generator

from sqlmodel import create_engine, SQLModel, Session

# this import is needed to register the tables from models.py
from services.tasks_api.db import models

# TODO: read from env vars
# PG_TASKS_DB_NAME=tasks_db

DATABASE_URL = "postgresql+psycopg2://admin:admin@postgres:5432/tasks_db"

engine = create_engine(DATABASE_URL, echo=True)


def init_db():
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    session = Session(engine)
    try:
        yield session
    except Exception:
        session.rollback()
        # TODO: add log message
        raise
    finally:
        session.close()


__all__ = [
    "init_db",
    "get_session",
]
