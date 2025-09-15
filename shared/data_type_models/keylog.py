import datetime

from sqlmodel import SQLModel


class Keylog(SQLModel, table=True):
    id: int = SQLModel.Field(primary_key=True, index=True)
    keylog: str
    created_at: datetime.datetime


class KeylogCreate(SQLModel):
    keylog: str
    created_at: datetime.datetime = datetime.datetime.now(datetime.UTC)


class KeylogRead(KeylogCreate):
    id: int
