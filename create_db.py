from db import Base, engine
from models import itemSkill, User, Login, History

print("creating a database...")

Base.metadata.create_all(engine)