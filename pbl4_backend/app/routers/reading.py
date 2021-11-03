from fastapi import APIRouter

from ..dependencies import load_model, run_prediction

from pydantic import BaseModel


class MultiChoiceQA(BaseModel):
    passage: str
    question: str
    answerA: str
    answerB: str
    answerC: str
    answerD: str


router = APIRouter()
tokenizer, model = load_model()


@router.post("/qa/")
async def handleQA(qa: MultiChoiceQA):
    input = (
        "question: "
        + qa.question
        + "".join(
            [
                " choice " + str(i + 1) + ": " + answer
                for i, answer in enumerate(
                    [qa.answerA, qa.answerB, qa.answerC, qa.answerD]
                )
            ]
        )
        + " context: "
        + qa.passage.replace("\n", "").replace("\t", "")
    )

    return {"output": run_prediction(tokenizer, model, input)}
