from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .model import Quiz
from ..questions.model import Questions, Options, Answers
from app.database import SessionLocal

quiz_router = APIRouter(prefix="/quiz")


@quiz_router.post("/create-quiz")
def create_quiz(
    name: str,
    description: str,
    video_id: str,
    question_ids: list[int],
    quiz_timer: int = 0,
) -> dict:
    Quiz.__table__.create(bind=SessionLocal().get_bind(), checkfirst=True)

    db = SessionLocal()
    quiz = Quiz(
        name=name,
        description=description,
        video_id=video_id,
        question_ids=question_ids,
        quiz_timer=quiz_timer,
    )
    db.add(quiz)
    db.commit()

    return JSONResponse(
        status_code=201,
        content=jsonable_encoder(
            {
                "quiz": {
                    "name": name,
                    "description": description,
                    "video_id": video_id,
                    "question_ids": question_ids,
                    "quiz_timer": quiz_timer,
                },
                "message": "Quiz created successfully",
            }
        ),
    )


@quiz_router.get("/")
def get_quizzes() -> dict:
    db = SessionLocal()
    quizzes = db.query(Quiz).all()

    return JSONResponse(
        status_code=200,
        content=jsonable_encoder(
            {
                "quizzes": [
                    {
                        "id": quiz.id,
                        "name": quiz.name,
                        "description": quiz.description,
                        "video_id": quiz.video_id,
                        "quiz_timer": quiz.quiz_timer,
                    }
                    for quiz in quizzes
                ]
            }
        ),
    )


@quiz_router.get("/{quiz_id}")
def get_quiz(quiz_id: int) -> dict:
    db = SessionLocal()
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    questions_raw = (
        db.query(Questions).filter(Questions.id.in_(quiz.question_ids)).all()
    )
    options_raw = (
        db.query(Options).filter(Options.question_id.in_(quiz.question_ids)).all()
    )

    questions = []

    for question in questions_raw:
        question_options = []
        for option in options_raw:
            if option.question_id == question.id:
                question_options.append(option.option_text)
        questions.append(
            {
                "question_id": question.id,
                "question_text": question.question_text,
                "options": question_options,
            }
        )

    return JSONResponse(
        status_code=200,
        content=jsonable_encoder(
            {
                "id": quiz.id,
                "name": quiz.name,
                "description": quiz.description,
                "video_id": quiz.video_id,
                "questions": questions,
                "quiz_timer": quiz.quiz_timer,
            }
        ),
    )


@quiz_router.post("/validate-answers")
def validate_answers(answers: list[dict]) -> dict:
    db = SessionLocal()

    correct_answers_raw = (
        db.query(Answers)
        .filter(Answers.question_id.in_([answer["question_id"] for answer in answers]))
        .all()
    )

    correct_answers = {
        answer.question_id: answer.answer_text for answer in correct_answers_raw
    }

    wrong_answers = []
    scored_answers = []

    score = 0

    for answer in answers:
        if correct_answers[answer["question_id"]] == answer["answer"]:
            scored_answers.append(
                {
                    "question_id": answer["question_id"],
                    "correct_answer": answer["answer"],
                    "answer": answer["answer"],
                }
            )
            score += 1
        else:
            wrong_answers.append(
                {
                    "question_id": answer["question_id"],
                    "correct_answer": correct_answers[answer["question_id"]],
                    "answer": answer["answer"],
                }
            )

    return JSONResponse(
        status_code=200,
        content=jsonable_encoder(
            {
                "score": score,
                "wrong_answers": wrong_answers,
                "scored_answers": scored_answers,
            }
        ),
    )


@quiz_router.patch("/{quiz_id}")
def update_quiz(
    quiz_id: int,
    quiz: dict = {
        "name": str,
        "description": str,
        "video_id": str,
        "question_ids": list[int],
    },
) -> dict:
    db = SessionLocal()
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    quiz.name = quiz["name"]
    quiz.description = quiz["description"]
    quiz.video_id = quiz["video_id"]
    quiz.question_ids = quiz["question_ids"]

    db.commit()

    return JSONResponse(
        status_code=200,
        content=jsonable_encoder(
            {
                "quiz": {
                    "id": quiz.id,
                    "name": quiz.name,
                    "description": quiz.description,
                    "video_id": quiz.video_id,
                },
                "message": "Quiz updated successfully",
            }
        ),
    )
