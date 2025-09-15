import datetime

from sqlmodel import SQLModel


class Telemetry(SQLModel, table=True):
    id: int = SQLModel.Field(primary_key=True, index=True)
    created_at: datetime.datetime
    updated_at: datetime.datetime


class TelemetryCreate(SQLModel):
    created_at: datetime.datetime = datetime.datetime.now(datetime.UTC)
    updated_at: datetime.datetime = datetime.datetime.now(datetime.UTC)


class TelemetryRead(TelemetryCreate):
    id: int


class TelemetryUpdate(SQLModel):
    updated_at: datetime.datetime = datetime.datetime.now(datetime.UTC)
