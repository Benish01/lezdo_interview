from App.Common.helper import get_from_env 
from fastapi import UploadFile, HTTPException
from App.Common.CustomResponse import CustomResponse
import os, uuid
from datetime import datetime

class FileController:
    def __init__(self):
        self.storage_path = get_from_env('BASE_STORAGE_PATH')
        self.allowed_extensions = ['jpeg', 'csv', 'png', 'jpg']
    

    def is_extension_allowed(self, file_name:str)->bool:
        extension = file_name.split('.')[-1].lower()
        return extension in self.allowed_extensions
    
    def get_parent_folder(self, file_name:str)->str:
        return file_name.split('.')[-1].lower()
    
    def generate_file_name(self, file_name:str)->str:
        return str(datetime.now().timestamp()) + "-" + file_name



    async def handle_file_upload(self, file:UploadFile, sub_folder_path = None):
        if not self.is_extension_allowed(file.filename):
            raise HTTPException(status_code=400, detail="File extension not allowed")
        parent_folder = self.get_parent_folder(file.filename)
        file_name = self.generate_file_name(file.filename)
        if sub_folder_path:
            file_path = os.path.join(self.storage_path, parent_folder, sub_folder_path, file_name)
        else:
            file_path = os.path.join(self.storage_path, parent_folder, file_name)

        os.makedirs(os.path.dirname(file_path), exist_ok=True)

        try:
            with open(file_path, "wb") as f:
                f.write(await file.read())
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error saving file: {str(e)}")

        return {"filename": file.filename, "message": "File uploaded successfully", "file_path": file_path}
    
    async def delete_file(self, file_path:str):
        if(os.path.exists(file_path)):
            os.remove(file_path)
            return {"message":"File deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="File not found")

