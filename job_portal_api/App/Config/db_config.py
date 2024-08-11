from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import OperationalError
from dotenv import load_dotenv
from sqlalchemy import text

import os
import urllib


load_dotenv()
DB_USER_NAME = os.getenv('DB_USER_NAME', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'root')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '3306')
DB_NAME = os.getenv('DB_NAME','lezdo_tech_med_job_portal')


SQLALCHEMY_DATABASE_URL =f"mysql+pymysql://{urllib.parse.quote_plus(DB_USER_NAME)}:{urllib.parse.quote_plus(DB_PASSWORD)}@{DB_HOST}:{DB_PORT}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

with engine.connect() as connection:
    connection.execute(text(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}"))
    print(f"Database '{DB_NAME}' created successfully.")


DATABASE_URL = f"{SQLALCHEMY_DATABASE_URL}/{DB_NAME}"
engine = create_engine(DATABASE_URL)




try:
    with engine.connect() as connection:
        print("------Database connection successful!--------")
except OperationalError as e:
    print(f"-----------------Error in Dtabase connection: {e}-----------------------------")
except Exception as e:
    print(f"------------------Error in Dtabase connection: {e}--------------------")




SessionLocal= sessionmaker(autocommit = False, bind=engine, autoflush=False)

Base = declarative_base()

db = SessionLocal()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()