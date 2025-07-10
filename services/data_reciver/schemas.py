from typing import List, Dict, Union

from shared.models.data import DataType
from shared.schemas import DataCreate


class CompleteUpload(DataCreate):
    key: str
    upload_id: str
    parts: List[Dict[str, object]]
    data: str = None
    data_type: Union[DataType.FILE, DataType.SCREENSHOT]
