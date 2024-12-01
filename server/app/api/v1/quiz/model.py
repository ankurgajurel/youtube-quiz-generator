from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Quiz(Base):
    __tablename__ = "quiz"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    video_id = Column(String)
    question_ids = Column(ARRAY(Integer))
    quiz_timer = Column(Integer, nullable=True)