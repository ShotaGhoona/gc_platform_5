from pydantic import BaseModel
from typing import List

class AttendanceDaysResponse(BaseModel):
    days: List[str]
