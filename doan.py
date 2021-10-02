from fastapi import FastAPI, Path
from typing import Optional
from fastapi.param_functions import Query
from pydantic.fields import Field
from pydantic.main import BaseModel



app = FastAPI()

class itemSkill(BaseModel):
    name : str
    description : Optional[str] = None
    question: str
    answers : Optional[str] = None

class UpdateItemSkill(BaseModel):
    name :  Optional[str] = None
    description : Optional[str] = None
    question:  Optional[str] = None
    answers : Optional[str] = None


introskill = {
    "listen": {"name":"listening", "description":"Can help you understand when someone talk!"},
    "speak": {"name":"speaking", "description":"Can help you communicate"},
    "read": {"name":"reading", "description":"Read somgthing in english"},
    "write": {"name":"writing", "description":"Write something in english"},
}

dbSkill = {}
dbTest = {}

class infoTests(BaseModel):
    task1: itemSkill
    task2: itemSkill
    task3: itemSkill
    task4: itemSkill

class UpdateInfoTests(BaseModel):
    task1: UpdateitemSkill
    task2: UpdateitemSkill
    task3: UpdateitemSkill
    task4: UpdateitemSkill


class Tests(BaseModel):
    level: Optional[int] = Field(gt=0, lt=4, description="Level: 0->4")
    description: Optional[str] = Field(None, max_length=100)
    info : infoTests

class UpdateTests(BaseModel):
    level: Optional[int] = None
    description:  Optional[str] = None
    info : Optional[UpdateinfoTests] = None

#####################
@app.get("/introduce")
async def introduce():
    return introskill

@app.get("/")
async def home():
    i = 0
    keyTest  = {}
    for key in dbTest.keys():
        if key != None:
            i+=1
            keyTest[i] = key
    return keyTest

@app.get("/test/{idtest}")
async def get_test_byID(idtest: str = Path(None ,description = "The ID of the Test")):
    return dbTest[idtest]

@app.get("/test-by-level/")
async def get_test_by_level(level: int  = Query(None, description = "Level of Test")):
    for idtest in dbTest:
        if dbTest[idtest]["level"] == level:
            return dbTest[idtest]
    return {"Data": "NotFound"}

@app.get("/itemskill-by-id/{idskill}")
async def get_itemskill_by_ID(idskill: int = Path(None, description = "The ID of skill!")):
    return dbSkill[idskill]

@app.get("/itemskill-by-name/")
async def get_itemskill_by_Name(name: str = Query(None, description = "Name of skill!")):
    for idskill in dbSkill:
        if dbSkill[idskill]["name"] == name:
            return dbSkill[idskill]
    return {"Data": "NotFound"}

'''
@app.get("/itemskill-by-question/")
async def get_itemskill_byQuestion(ques: str = Query(None, description = "Question")):
    for idskill in dbSkill:
        if dbSkill[idskill]["quesion"] != None:
            re.search(ques, str(dbSkill[idskill]["quesion"]))
            return dbSkill[idskill]
    return {"Data": "NotFound"}
'''


@app.post("/create-itemskill/{idskill}")
async def create_itemSkill(idskill: int, item: itemSkill):
    if idskill in dbSkill:
        return {"Error": "ID tes already exits."}
    
    dbSkill[idskill] = item
    return dbSkill[idskill]

@app.post("/create-test/{idtest}")
async def create_test(idtest: str, test: Tests):
    if idtest in dbTest:
        return {"Error": "ID test already exits."}

    dbTest[idtest] = test
    return dbTest[idtest]

@app.put("/update-test/{idtest}")
async def update_test(idtest: str, test: UpdateTests):
    if idtest not in dbTest:
        return {"Error": "ID test does not exits."}

    if test.level != None:
        dbTest[idtest].level = test.level
    
    if test.description != None:
        dbTest[idtest].description = test.description

    if test.info != None:
        dbTest[idtest].info = test.info
    return dbTest[idtest]


@app.put("/update-itemskill/{idskill}")
async def Update_ItemSkill(idskill: int, updateitem: UpdateitemSkill):
    if idskill not in dbSkill:
        return {"Error": "ID skill does not exits."}
    
    if updateitem.name != None:
        dbSkill[idskill].name = updateitem.name
    
    if updateitem.description != None:
        dbSkill[idskill].description = updateitem.description
    
    if updateitem.question != None:
        dbSkill[idskill].question = updateitem.question
    
    if updateitem.answers != None:
        dbSkill[idskill].answers = updateitem.answers
    
    return dbSkill[idskill]

@app.delete("/delete-test/{idtest}")
async def delete_test(idtest: str):
    if idtest not in dbTest:
        return {"Error": "ID test does not exits."}
    
    del dbTest[idtest]
    return {"Message": "Delete test successfully"}

@app.delete("/delete-itemSkill/{idskill}")
async def delete_itemskill(idskill: int):
    if idskill not in dbSkill:
        return {"Error": "ID skill does not exits."}
    
    del dbSkill[idskill]
    return {"Message": "Delete ItemSkill successfully"}
