from db import Base
from sqlalchemy import String, Integer, Boolean, Column, Text

class itemSkill(Base):
    __tablename__ = "AllSkills"
    id = Column(Integer, primary_key = True)
    name = Column(String(255), nullable = False, unique = False)
    description = Column(String(255), nullable = True, unique = False)
    question = Column(String(255), nullable = False, unique = False)
    answers = Column(String(255), nullable = False, unique = False)
    


class User(Base):
    __tablename__ = "Login"
    id = Column(Integer, primary_key = True)
    userName = Column(String(255), nullable = False)
    password = Column(String(255), nullable = False)

class Login(Base):
    __tablename__ = "userlogin"
    username = Column(String(255), primary_key = True)
    password = Column(String(255), nullable = False) 