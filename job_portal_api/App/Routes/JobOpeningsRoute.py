from fastapi import APIRouter, Depends
from App.Schemas import *
from App.Controllers import JobOpeningController
from sqlalchemy.orm import Session
from App.Config.db_config import get_db
from App.Common.CustomResponse import CustomResponse
from fastapi import HTTPException, status





job_opening_router = APIRouter(prefix='/job_opening')

@job_opening_router.post('/create')
async def create_job(job_opening:JobOpeningCreate , db:Session = Depends(get_db)):
        try:
            job_opening_controller = JobOpeningController(db)
            message =  job_opening_controller.create_job(job_data=job_opening)
            return CustomResponse.success_response(message=message)
        except HTTPException as e:
             return CustomResponse.failure_response(message=e.detail, status_code=e.status_code)
        except Exception as e:
            return CustomResponse.failure_response(message=str(e))
        
@job_opening_router.get('/all')
async def get_all_job_openings(db:Session=Depends(get_db)):
        try:
            job_opening_controller = JobOpeningController(db)
            data =  job_opening_controller.get_all_jobs()
            return CustomResponse.success_response(data=data)
        except HTTPException as e:
             return CustomResponse.failure_response(message=e.detail, status_code=e.status_code)
        except Exception as e:
            return CustomResponse.failure_response(message=str(e))
        
@job_opening_router.post('/edit_job/{id}')
async def edit_job(id : int, job_update_data:JobUpdateSchema, db:Session=Depends(get_db)):
        try:
            job_opening_controller = JobOpeningController(db)
            data =  job_opening_controller.update_job(id, job_update_data.model_dump(exclude_unset=True) )
            return CustomResponse.success_response(message=data)
        except HTTPException as e:
             return CustomResponse.failure_response(message=e.detail, status_code=e.status_code)
        except Exception as e:
            return CustomResponse.failure_response(message=str(e))
        
@job_opening_router.get('/get_job/{id}')
async def get_job(id: int, db: Session = Depends(get_db)):
    try:
        job_opening_controller = JobOpeningController(db)
        data = job_opening_controller.get_job(id)
        return CustomResponse.success_response(data=data)
    except HTTPException as e:
        return CustomResponse.failure_response(message=e.detail, status_code=e.status_code)
    except Exception as e:
        return CustomResponse.failure_response(message=str(e))
     




