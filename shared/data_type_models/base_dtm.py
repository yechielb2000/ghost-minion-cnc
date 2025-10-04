import datetime

from sqlmodel import SQLModel


class BaseDTM(SQLModel):
    id: int = SQLModel.Field(primary_key=True, index=True)
    created_at: datetime.datetime = datetime.datetime.now(datetime.UTC)
    collected_at: datetime.datetime
