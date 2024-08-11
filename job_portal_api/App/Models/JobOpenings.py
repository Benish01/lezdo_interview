from ..Config.db_config import Base
from sqlalchemy import Column, Boolean, String, Integer, BigInteger, Date, Text, DateTime, JSON
from datetime import datetime



class JobOpenings(Base):
    __tablename__ = "job_openings"

    id = Column(BigInteger, primary_key = True, autoincrement = True)
    job_title = Column(String(256))
    job_opening_id = Column(String(30))
    department = Column(String(50))
    no_of_positions = Column(BigInteger)
    assigned_recruiter = Column(String(50))
    job_opening_status = Column(String(50))
    date_opened = Column(String(255))
    closing_date = Column(String(255))
    salary = Column(String(20))
    email = Column(String(256))
    hiring_manager = Column(String(50))
    job_type = Column(String(50))
    experience = Column(String(50))
    skills_required = Column(JSON)
    city = Column(String(50))
    state_province = Column(String(50))
    zip_postal_code = Column(String(50))
    job_description = Column(Text)
    requirements = Column(Text)
    benefits = Column(Text)
    questions = Column(JSON)
    tags = Column(JSON)
    notes = Column(Text)
    interview_schedules = Column(JSON)
    attachments = Column(JSON)
    pre_screening_assignments = Column(JSON)
    previous_status = Column(String(50))
    current_status = Column(String(50))
    status_changed_by = Column(String(50))
    created_by = Column(String(50))
    published_by = Column(String(50))
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now())


