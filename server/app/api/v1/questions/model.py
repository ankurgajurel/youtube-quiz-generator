from sqlalchemy import Column, Date, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Videos(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(String)
    video_url = Column(String)
    questions = Column(Integer)
    options = Column(Integer)

class Questions(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    question_text = Column(String)
    video_id = Column(Integer)

class Options(Base):
    __tablename__ = "options"

    id = Column(Integer, primary_key=True, index=True)
    option_text = Column(String)
    question_id = Column(Integer)

class Answers(Base):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, index=True)
    answer_text = Column(String)
    question_id = Column(Integer)
