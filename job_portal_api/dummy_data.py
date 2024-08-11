from App.Config.db_config import engine, Base, db
from sqlalchemy import func
from App.Schemas import JobOpeningCreate
import json
from sqlalchemy.exc import SQLAlchemyError

from App.Models import *

def and_dummy_data(db = db):
    Base.metadata.create_all(bind = engine)

    if db.query(func.count(JobOpenings.id)).scalar() == 0:
        dummy_data = get_job_opening_dummy_data()
        try:
            for data in dummy_data:
                job_opening_data = JobOpeningCreate(**data)
                save_job_opening(db , job_opening_data)
            db.commit()  
            print('------------------Dummy Data Inserted For Jobs-----------------')
        except SQLAlchemyError as e:
            db.rollback()
            print(f"SQLAlchemy error occurred: {e}")
        except Exception as e:
            db.rollback()
            print(f"An unexpected error occurred: {e}")
           

def replace_none_strings_with_none(data):
    if isinstance(data, dict):
        return {k: replace_none_strings_with_none(v) for k, v in data.items()}
    elif data == 'None':
        return None
    else:
        return data


def save_job_opening(db, job_opening_data : JobOpeningCreate):
    job_data = job_opening_data.model_dump()
    job_data = replace_none_strings_with_none(job_data)

    job_opening = JobOpenings(
        job_title=job_data['job_title'],
        no_of_positions=job_data['no_of_positions'],
        assigned_recruiter=job_data['assigned_recruiter'],
        job_opening_status=job_data['job_opening_status'],
        date_opened=job_data['date_opened'],
        closing_date=job_data['closing_date'],
        salary=job_data['salary'],
        email=job_data['email'],
        manager=job_data['manager'],
        job_type=job_data['job_type'],
        experience=job_data['experience'],
        skills_required=json.dumps(job_data['skills_required']),
        city=job_data['city'],
        state_province=job_data['state_province'],
        zip_postal_code=job_data['zip_postal_code'],
        job_description=job_data['job_description'],
        requirements=job_data['requirements'],
        benefits=job_data['benefits'],
        questions=json.dumps(job_data['questions']),
        tags=json.dumps(job_data['tags']),
        notes=job_data['notes'],
        interview_schedules=json.dumps(job_data['interview_schedules']),
        attachments=json.dumps(job_data['attachments']),
        pre_screening_assignments=json.dumps(job_data['pre_screening_assignments']),
        previous_status=job_data['previous_status'],
        current_status=job_data['current_status'],
        status_changed_by=job_data['status_changed_by'],
        created_by=job_data['created_by'],
        published_by=job_data['published_by']
    )
    db.add(job_opening)
    


def get_job_opening_dummy_data():
      
      return [
             {
            "job_title": "Developer",
            "no_of_positions": 3,
            "assigned_recruiter": "Alice Smith",
            "job_opening_status": "in_progress",
            "date_opened": "2024-08-01",
            "closing_date": "2024-09-01",
            "salary": "10-15k",
            "email": "alice.smith@example.com",
            "manager": "John Doe",
            "job_type": "full_time",
            "experience": "3-5 years",
            "skills_required": ["Python", "Django", "SQL"],
            "city": "Nagercoil",
            "state_province": "TamilNadu",
            "zip_postal_code": "00100",
            "job_description": "Develop and maintain web applications.",
            "requirements": "Bachelor's degree in Computer Science.",
            "benefits": "Health insurance, paid time off.",
            "tags": ["Engineering", "Full-Time"],
            "notes": "Looking for candidates with strong Python skills.",
            "interview_schedules": [{"date": "2024-08-10", "time": "10:00 AM", "interviewer": "Jane Doe"}],
            "attachments": [{"filename": "job_description.pdf", "url": "http://example.com/job_description.pdf"}],
            "pre_screening_assignments": [{"assignment": "Code challenge", "details": "Complete a Python coding exercise."}],
            "previous_status": "None",
            "current_status": "In Progress",
            "status_changed_by": "Alice Smith",
            "created_by": "Admin",
            "published_by": "Hiring Manager"
        },
        {
            "job_title": "UI UX Designer",
            "no_of_positions": 2,
            "assigned_recruiter": "Bob Johnson",
            "job_opening_status": "waiting_for_approval",
            "date_opened": "2024-08-05",
            "closing_date": "2024-09-10",
            "salary": "15-20k",
            "email": "bob.johnson@example.com",
            "manager": "Sarah Lee",
            "job_type": "Part-Time",
            "experience": "5-7 years",
            "skills_required": ["Product Management", "Market Research", "Project Management"],
            "city": "Mombasa",
            "state_province": "Mombasa",
            "zip_postal_code": "00200",
            "job_description": "Manage product lifecycle from concept to launch.",
            "requirements": "Master's degree in Business Administration.",
            "benefits": "Flexible hours, remote work option.",
            "questions": {"question1": "How do you handle product roadmaps?"},
            "tags": ["Management", "Part-Time"],
            "notes": "Experience with market analysis is a plus.",
            "interview_schedules": [{"date": "2024-08-15", "time": "2:00 PM", "interviewer": "Emily Davis"}],
            "attachments": [{"filename": "product_manager_role.pdf", "url": "http://example.com/product_manager_role.pdf"}],
            "pre_screening_assignments": [{"assignment": "Market analysis report", "details": "Submit a report on market trends."}],
            "previous_status": "None",
            "current_status": "In Progress",
            "status_changed_by": "Bob Johnson",
            "created_by": "Admin",
            "published_by": "Hiring Manager"
        }
      ]
