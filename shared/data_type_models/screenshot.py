import datetime

from sqlmodel import SQLModel


class Screenshot(SQLModel, table=True):
    id: int = SQLModel.Field(primary_key=True, index=True)
    image_link: str
    created_at: datetime.datetime


class ScreenshotCreate(SQLModel):
    image_link: str
    created_at: datetime.datetime = datetime.datetime.now(datetime.UTC)


class ScreenshotRead(ScreenshotCreate):
    id: int
