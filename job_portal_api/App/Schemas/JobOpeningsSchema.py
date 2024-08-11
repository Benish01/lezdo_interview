from pydantic import BaseModel, Field, EmailStr, ConfigDict, model_validator, field_validator
from typing import Optional, List, Dict, Any
from datetime import date, datetime
import uuid
from dateutil import parser




class JobOpeningCreate(BaseModel):
    job_title: str
    job_opening_id : Optional[str] = None
    department : Optional[str] = None
    no_of_positions: Optional[int] = None
    assigned_recruiter: Optional[str] = None
    job_opening_status: Optional[str] = None
    date_opened: Optional[Any] = None
    closing_date: Optional[Any] = None
    salary: Optional[str] = None
    email: Optional[str]  = None
    hiring_manager: Optional[str] = None
    job_type: Optional[str] = None
    experience: Optional[str] = None
    skills_required: Optional[List[str]]  = None
    city: Optional[str] = None
    state_province: Optional[str] = None
    zip_postal_code: Optional[str] = None
    job_description: Optional[str]   = None
    requirements: Optional[str]  = None
    benefits: Optional[str]  = None
    questions: Optional[Any]  = {}
    tags: Optional[Any] = []
    notes: Optional[str]= None
    interview_schedules: Optional[Any]  = []
    attachments: Optional[Any]  = [] 
    pre_screening_assignments: Optional[Any]  = []
    previous_status: Optional[str] = None
    current_status: Optional[str] = "in_progress"
    status_changed_by: Optional[str] = None
    created_by: Optional[str] = "admin"
    published_by: Optional[str] = "hiring_manager"
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now())
    updated_at: Optional[datetime] = Field(default_factory=lambda: datetime.now())

    


    model_config = ConfigDict(from_attributes=True)



class JobOpeningDisplay(JobOpeningCreate):
    id : int


class JobUpdateSchema(BaseModel):
    status: Optional[str] = None
    notes : Optional[str] = None
    tags : Optional[Any] = None



    



