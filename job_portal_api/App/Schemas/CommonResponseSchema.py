

from typing import Any, Generic, List, Optional, TypeVar
from pydantic import BaseModel

DataType = TypeVar("DataType")

class CommonResponseSchema(BaseModel, Generic[DataType]):
    message: str = ""
    status: str = "success"
    data: Optional[DataType] = []
    status_code : int = 200