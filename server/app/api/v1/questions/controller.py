from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .services import get_video_transcript, generate_questions, extract_vtt_transcript
from .model import Questions, Options, Answers, Videos
from app.database import SessionLocal
import json
from urllib.parse import unquote

questions_router = APIRouter(prefix="/questions")


@questions_router.post("/generate")
def generate_questions_from_video(
    video_url: str = "",
    questions: int = 10,
    options: int = 4,
    is_vtt: bool = False,
    vtt_file_url: str = "",
) -> dict:

    if is_vtt:
        if not vtt_file_url:
            return JSONResponse(
                status_code=400,
                content=jsonable_encoder(
                    {
                        "message": "Please provide the URL for the VTT file",
                    }
                ),
            )
        vtt_file = open(vtt_file_url, "r")
        vtt = vtt_file.read()
        transcript = extract_vtt_transcript(vtt)

    else:
        if not video_url:
            return JSONResponse(
                status_code=400,
                content=jsonable_encoder(
                    {"message": "Please provide the YouTube Video URL."}
                ),
            )
        decored_video_url = unquote(video_url)
        transcript = get_video_transcript(decored_video_url)

    print(transcript)

    generated_questions = json.loads(
        generate_questions(transcript, questions, options)
        .replace("```json", "")
        .replace("```", ""),
    )

    print(generated_questions)
    return_video_id = 0

    session = SessionLocal()
    Questions.__table__.create(bind=session.get_bind(), checkfirst=True)
    Options.__table__.create(bind=session.get_bind(), checkfirst=True)
    Answers.__table__.create(bind=session.get_bind(), checkfirst=True)
    Videos.__table__.create(bind=session.get_bind(), checkfirst=True)

    video_db = Videos(
        video_id=video_url.split("v=")[1],
        video_url=video_url,
        questions=questions,
        options=options,
    )
    session.add(video_db)
    session.commit()
    session.commit()

    return_video_id = video_db.id

    print(return_video_id)

    return_questions = []

    for question in generated_questions:
        question_text = question["question"]
        options = question["options"]
        correct_answer = question["correct_answer"]

        question_db = Questions(question_text=question_text, video_id=video_db.id)
        session.add(question_db)
        session.commit()

        return_questions.append(
            {
                "question": question_text,
                "question_id": question_db.id,
                "options": options,
                "correct_answer": correct_answer,
            }
        )

        for option in options:
            option_db = Options(option_text=option, question_id=question_db.id)
            session.add(option_db)

        answer_db = Answers(answer_text=correct_answer, question_id=question_db.id)
        session.add(answer_db)

    session.commit()
    session.close()

    return JSONResponse(
        status_code=201,
        content=jsonable_encoder(
            {
                "questions": return_questions,
                "message": "Questions generated successfully",
                "video_id": return_video_id,
            }
        ),
    )


@questions_router.get("/list")
def get_questions(video_id: int):
    session = SessionLocal()
    questions = session.query(Questions).filter(Questions.video_id == video_id).all()
    session.close()

    return questions


@questions_router.get("/list/options/{question_id}")
def get_options(question_id: int):
    session = SessionLocal()
    options = session.query(Options).filter(Options.question_id == question_id).all()
    session.close()

    return options


@questions_router.get("/list/answer/{question_id}")
def get_answer(question_id: int):
    session = SessionLocal()
    answer = session.query(Answers).filter(Answers.question_id == question_id).first()
    session.close()

    return answer
