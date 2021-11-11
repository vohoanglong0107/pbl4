from fastapi import FastAPI, Path, status, HTTPException, Depends, Request, File, UploadFile, Form
from typing import Optional, List
from fastapi.param_functions import Query
from pydantic.fields import Field
from pydantic.main import BaseModel
from db import SessionLocal, get_db
import models
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from starlette.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, FileResponse
from passlib.context import CryptContext   
from sqlalchemy.exc import IntegrityError



from LoginForm import *



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()


listUser = list()
template = Jinja2Templates(directory="LoginForm/Templ")


class itemSkill(BaseModel):
    id : int
    name : str
    description : Optional[str] = None
    question: str
    answers : Optional[str] = None

    class Config:
        orm_mode = True

class User(BaseModel):
    id:int
    userName:str
    password:str

    class Config:
        orm_mode =True
        
class Login(BaseModel):
    username :str
    password:str

    class Config:
        orm_mode =True

db = SessionLocal()

class History(BaseModel):
    hist_id :int
    user:int
    item_id:int

    class Config:
        orm_mode =True
        
        
introskill = {
    "listen": {"name":"listening", "description":"Can help you understand when someone talk!"},
    "speak": {"name":"speaking", "description":"Can help you communicate"},
    "read": {"name":"reading", "description":"Read somgthing in english"},
    "write": {"name":"writing", "description":"Write something in english"},
}



# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
#     allow_credentials=True,
# )

# Dependency
# def get_db():
#     try:
#         yield db
#     finally:
#         db.close()


@app.get("/test/{test_id}/public", response_model=itemSkill, response_model_exclude=["name", "description", "question","answers" ])
async def read_item_public_data(test_id: int):
    item= db.query(models.itemSkill).filter(models.itemSkill.id == test_id).first()
    return item

@app.get("/")
def main():
    return RedirectResponse(url="/login/")


# @app.get("/records/", response_model=List[itemSkill])
# def show_records(db: Session = Depends(get_db)):
#     records = db.query(models.itemSkill).all()
#     return records

    
@app.get("/login", response_class=HTMLResponse)
def get_login(request: Request):
    return template.TemplateResponse("login.html", {"request":request})

@app.post("/login", response_class=HTMLResponse)
def post_login (request: Request ,user_name: str = Form(...), password:str = Form(...)):
    return template.TemplateResponse("login.html", {"request": Request})

# @app.post('/regist', response_class=HTMLResponse)
# def regist(request: Request ,name: str = Form(...), passs:str = Form(...)):
#     if 'username' in Request.form and 'password' in Request.form:
#         username = Request.form['user_name']
#         password = Request.form['passwordd']
#         print(user_name)
#         print(passwordd)
#     return template.TemplateResponse("regist.html", {"request": request})



# def get_password_hash(password):
#     return pwd_context.hash(password)

# def get_user(db, username: str):
#     if username in db:
#         user_dict = db[username]
#         return UserInDB(**user_dict)


@app.get("/regist", response_class=HTMLResponse)
def get_regis(request: Request):
    return template.TemplateResponse("regist.html", {"request":request})

@app.post("/regist", response_class=HTMLResponse)
async def post_regis (request: Request):
    # return template.TemplateResponse("regist.html", {"request": Request})
    form = await request.form()
    username = form.get("username")
    password = form.get("password")

    user = Login(username= username, password = password)
    # try:
    db.add(user)
    db.commit()

    return template.TemplateResponse("regist.html", {"request":request})


@app.get("/success", response_class=HTMLResponse)
def get_login(request: Request):
    return template.TemplateResponse("success.html", {"request":request})
















###########################################################################################################

@app.get("/user", response_model=List[User], status_code=200, tags =["User"])
def get_all_user():
    items= db.query(models.User).all()
    return items

@app.get("/user/{id}", tags =["User"])
def get_user(id:int):
    user= db.query(models.User).filter(models.User.id == id).first()
    return user

@app.get("/user/hist", response_class=HTMLResponse, tags=["User"])
def get_hist(request:Request):
    return template.TemplateResponse("hist.html", {"request":request})
@app.post("/user/hist", response_class=HTMLResponse, tags=["User"])
def post_hist (request: Request ):
    # user = request.User.id
    # item_id = request.POST('item_id')
    # hist = History(user = user, item_id = item_id)
    # hist.commit()
    return template.TemplateResponse("hist.html", {"request": Request})

pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")

@app.post("/user",response_model = User, status_code= status.HTTP_201_CREATED, tags =["User"])
def create_User(user:User):
 #   hashedPassword = pwd_cxt.hash(password)
    db_user = db.query(models.User).filter(models.User.userName == user.userName).first()
    if db_user is not None:
        raise HTTPException(status_code= 400, detail ="user already exists")

    new_user = models.User(
        userName = user.userName,
        password = user.password
    )

    


    db.add(new_user)

    db.commit()
    return new_user

@app.put("/user/{skill_id}", response_model=User, status_code = status.HTTP_200_OK, tags =["User"])
def update_User(id:int, user:User):
    skill_update = db.query(models.User).filter(models.User.id==id).first()
    skill_update.name = user.userName
    skill_update.password = user.password

        
    db.commit()

    return skill_update

@app.delete("/user/{id}", tags =["User"])
def delete_user(id:int):
    skill_del = db.query(models.User).filter(models.User.id  == id).first()

    if skill_del is None:
        raise HTTPException(status_code =status.HTTP_404_NOT_FOUND, detail ="found no skill")

    db.delete(skill_del)
    db.commit()

    return skill_del

#####################
@app.get("/")
async def introduce():
    return introskill

@app.get("/itemskills", response_model=List[itemSkill], status_code=200, tags =["itemSkill"])
def get_all_itemskills():
    items= db.query(models.itemSkill).all()
    return items

@app.get("/itemskill/{skill_id}", tags =["itemSkill"])
def get_an_skill(skill_id:int):
    skill= db.query(models.itemSkill).filter(models.itemSkill.id == skill_id).first()
    return skill

@app.post("/itemskills",response_model = itemSkill, status_code= status.HTTP_201_CREATED, tags =["itemSkill"])
def create_an_skill(skill:itemSkill):

    db_skill = db.query(models.itemSkill).filter(models.itemSkill.name == skill.name).first()
    if db_skill is not None:
        raise HTTPException(status_code= 400, detail ="Skill already exists")

    new_skill = models.itemSkill(
        name = skill.name,
        description = skill.description,
        question = skill.question,
        answers = skill.answers
    )

    


    db.add(new_skill)

    db.commit()
    return new_skill


@app.put("/itemskill/{skill_id}", response_model=itemSkill, status_code = status.HTTP_200_OK, tags =["itemSkill"])
def update_an_skill(skill_id:int, skill:itemSkill):
    skill_update = db.query(models.itemSkill).filter(models.itemSkill.id==skill_id).first()
    skill_update.name = skill.name
    skill_update.description = skill.description
    skill_update.question = skill.question
    skill_update.answers = skill.answers

    if skill_update.name == None:
        skill_update.name = skill.name
    if skill_update.description == None:
        skill_update.description = skill.description
    if skill_update.question == None:
        skill_update.question = skill.question
    if skill_update.answers is None:
        skill_update.answers = skill.answers
        
    db.commit()

    return skill_update
   

@app.delete("/skill/{skill_id}", tags =["itemSkill"])
def delete_an_skill(skill_id:int):
    skill_del = db.query(models.itemSkill).filter(models.itemSkill.id  == skill_id).first()

    if skill_del is None:
        raise HTTPException(status_code =status.HTTP_404_NOT_FOUND, detail ="found no skill")

    db.delete(skill_del)
    db.commit()

    return skill_del