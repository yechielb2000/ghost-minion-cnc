from typing import List, Dict, Union

from shared.models.data import DataType
from shared.schemas import DataCreate
from pydantic import field_validator


class CompleteUpload(DataCreate):
    key: str
    upload_id: str
    parts: List[Dict[str, object]]
    data: str = None
    data_type: Union[DataType.FILE, DataType.SCREENSHOT]

    @field_validator('data_type')
    def validate_data_type(cls, data_type: Union[DataType.FILE, DataType.SCREENSHOT]):
        if data_type not in [DataType.FILE, DataType.SCREENSHOT]:
            raise ValueError(f'Invalid data type: {data_type}')
        return data_type