import datetime

from sqlmodel import SQLModel


class Screenshot(SQLModel, table=True):
    image_link: str


class ScreenshotCreate(SQLModel):
    image_link: str
    created_at: datetime.datetime = datetime.datetime.now(datetime.UTC)


class ScreenshotRead(ScreenshotCreate):
    id: int
