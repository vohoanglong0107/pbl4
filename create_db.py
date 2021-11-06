from db import Base, engine
from models import itemSkill, User, Login 

print("creating a database...")

Base.metadata.create_all(engine)