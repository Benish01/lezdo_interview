from ..Config.db_config import Base
from sqlalchemy import Column, Boolean, String, Integer, BigInteger, Date, Text, DateTime, JSON
from datetime import datetime



class Users(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key = True, autoincrement = True)
    email = Column(String(256))
    first_name = Column(String(30))
    middle_name = Column(String(50))
    last_name = Column(BigInteger)
    mobile_num = Column(String(50))
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now())


