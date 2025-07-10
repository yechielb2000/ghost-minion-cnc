from datetime import datetime
from typing import List, Dict

from pydantic import BaseModel

from shared.models.data import DataType


class CompleteUpload(BaseModel):
    key: str
    upload_id: str
    parts: List[Dict[str, object]]
