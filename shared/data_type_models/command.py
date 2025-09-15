import datetime

from sqlmodel import SQLModel


class Command(SQLModel, table=True):
    id: int = SQLModel.Field(primary_key=True, index=True)
    command: str
    output: str
    created_at: datetime.datetime


class CommandCreate(SQLModel):
    command: str
    output: str
    created_at: datetime.datetime = datetime.datetime.now(datetime.UTC)


class CommandRead(CommandCreate):
    id: int
