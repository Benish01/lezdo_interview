

from fastapi import UploadFile
from fastapi import APIRouter, Request, Depends, HTTPException
from App.Controllers import FileController
from App.Common.CustomResponse import CustomResponse



common_router = APIRouter(prefix='/common')

@common_router.post('/upload_file')
async def upload_file(file:UploadFile, controller:FileController = Depends()):
    try:
        response =  await controller.handle_file_upload(file)
        return CustomResponse.success_response(data=response)
    except HTTPException as e:
             return CustomResponse.failure_response(message=e.detail, status_code=e.status_code)
    except Exception as e:
        return CustomResponse.failure_response(message=str(e))

@common_router.post('/delete_file')
async def delete_file(request:Request, controller:FileController = Depends()):
    try:
        body = await request.json()
        file_path = body.get("file_path")
        response =  await controller.delete_file(file_path)
        return CustomResponse.success_response(data=response)
    except HTTPException as e:
             return CustomResponse.failure_response(message=e.detail, status_code=e.status_code)
    except Exception as e:
        return CustomResponse.failure_response(message=str(e))
     






        
        

