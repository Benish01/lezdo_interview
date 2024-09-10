from fastapi import FastAPI, Depends

from App.Routes import *

from App.Config.db_config import get_db

from fastapi.middleware.cors import CORSMiddleware





app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

app.include_router(job_opening_router, dependencies=[Depends(get_db)])
app.include_router(common_router)