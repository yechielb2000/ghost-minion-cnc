import datetime

from sqlmodel import SQLModel

from shared.data_type_models.base_dtm import BaseDTM


class Keylog(BaseDTM, table=True):
    keylog: str


class KeylogCreate(SQLModel):
    keylog: str
    created_at: datetime.datetime = datetime.datetime.now(datetime.UTC)


class KeylogRead(KeylogCreate):
    id: int
