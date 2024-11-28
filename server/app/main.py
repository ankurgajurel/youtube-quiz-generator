import typing as ty
from fastapi import FastAPI, Depends, APIRouter
from sqlalchemy.orm import Session
from . import database
import uvicorn

from app.api.v1.questions.controller import questions_router


database.create_database()
app = FastAPI(
    title="AI Youtube Questions Generator",
    description="Generate questions from a youtube video",
    version="0.1",
)


def get_db():
    print("Connection to database")
    db = database.SessionLocal()
    print("Database Connection successful")
    try:
        yield db
    finally:
        db.close()


DatabaseDependency: ty.TypeAlias = ty.Annotated[Session, Depends(get_db)]

main_router = APIRouter()
main_router.include_router(questions_router, prefix="/v1")
app.include_router(main_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Youtube Question Generator!"}


if __name__ == "__main__":
    get_db()
    uvicorn.run(app, host="0.0.0.0", port=8005)
