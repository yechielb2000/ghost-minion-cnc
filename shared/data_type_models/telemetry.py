import datetime
import uuid

from sqlmodel import SQLModel

from shared.data_type_models.base_dtm import BaseDTM


class Telemetry(BaseDTM, table=True):
    agent_id: uuid.UUID
    updated_at: datetime.datetime


class TelemetryCreate(SQLModel):
    agent_id: uuid.UUID
    updated_at: datetime.datetime = datetime.datetime.now(datetime.UTC)


class TelemetryRead(TelemetryCreate):
    id: int


class TelemetryUpdate(SQLModel):
    updated_at: datetime.datetime = datetime.datetime.now(datetime.UTC)
