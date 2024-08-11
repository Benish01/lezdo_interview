
from App.Models import JobOpenings
from App.Config.db_config import db
from App.Common.CustomResponse import CustomResponse
from App.Schemas import JobOpeningCreate, JobOpeningDisplay
from sqlalchemy.orm import Session
import json, uuid
from fastapi import HTTPException, status

from sqlalchemy.exc import SQLAlchemyError


class JobOpeningController:
    def __init__(self, db: Session):
        self.db = db

        self.departments = {
            "Development": ["Developer", "Frontend Developer", "Backend Developer", "Junior Developer", 'developer', "frontend_developer", "backend_developer", "junior_developer"],
            "Designing": ["UI UX Designer", "UI Designer", "Graphics Designer", "UX Designer", "graphics_designer", "ux_designer", "ui_designer"],
            "Management": ["Manager", "manager"],
            "Business": ["Analyst", "analyst"]
        }
    
        
    def generate_job_opening_id(self, title):
        if title:
            prefix = title[:2].upper()
            unique_suffix = str(uuid.uuid4().int)[:3]
            return f"{prefix}{unique_suffix}"
        else:
            return None
        
    def get_department_by_title(self, job_title):
        for department, titles in self.departments.items():
            if job_title in titles:
                return department
        return None


        


    def create_job(self, job_data:JobOpeningCreate):
        try:
            job_datas = job_data.model_dump()
            job_datas['job_opening_id'] = self.generate_job_opening_id(job_datas['job_title'])
            job_datas['department'] = self.get_department_by_title(job_datas['job_title'])
            job_datas['current_status'] = job_datas['job_opening_status']
            job_opening = JobOpenings(**job_datas)
            self.db.add(job_opening)
            self.db.commit()
            self.db.refresh(job_opening)
            return "Job Opening Created Successfully"
        except Exception as e:
             self.db.rollback()
             raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        

    def get_all_jobs(self):
        job_openings = self.db.query(JobOpenings).all()
        return [JobOpeningDisplay.model_validate(job) for job in job_openings]
    

    def update_job(self, id: int, update_data: dict):
        try:
            job = self.db.query(JobOpenings).filter(JobOpenings.id == id).first()
            
            if not job:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
            
            for key, value in update_data.items():
                if key == 'status':
                    setattr(job, 'previous_status', job.current_status)
                    setattr(job, 'current_status', value)
                    setattr(job, 'job_opening_status', value)
                else:
                    setattr(job, key, value)

            self.db.commit()
            self.db.refresh(job)
            return "job status updated"
        
        except HTTPException as e:
            raise e  
            
        except SQLAlchemyError as e:
            self.db.rollback()  
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error: " + str(e))
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


    def get_job(self, id: int):
        try:
            job = self.db.query(JobOpenings).get(id)
            if not job:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Job with id {id} not found.")
            return JobOpeningDisplay.model_validate(job)
        except HTTPException as e:
            raise e  
        except SQLAlchemyError as e:
            self.db.rollback()  
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error: " + str(e))
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))




