import datetime

from sqlmodel import SQLModel

from shared.data_type_models.base_dtm import BaseDTM


class Command(BaseDTM, table=True):
    command: str
    output: str


class CommandCreate(SQLModel):
    command: str
    output: str
    created_at: datetime.datetime = datetime.datetime.now(datetime.UTC)


class CommandRead(CommandCreate):
    id: int
