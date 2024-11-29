import typing as ty
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import database
import uvicorn

from app.api.v1.questions.controller import questions_router
from app.api.v1.quiz.controller import quiz_router


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

origins = [
    "http://client.localhost:8006",
    "http://admin.localhost:8006",
    "http://localhost:8006",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(questions_router, prefix="/api/v1")
app.include_router(quiz_router, prefix="/api/v1")


@app.get("/")
def read_root():
    return {"message": "Welcome to Youtube Question Generator!"}


if __name__ == "__main__":
    get_db()
    uvicorn.run(app, host="0.0.0.0", port=8005)
