from typing import TypedDict
from dotenv import dotenv_values
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

class ConfigEnvironmentType(TypedDict):
    YOUTUBE_API_KEY: str
    OPENAI_API_KEY: str
    DATABASE_URI: str


config_environemnt: ConfigEnvironmentType = dict(dotenv_values(".env"))

engine = create_engine(config_environemnt["DATABASE_URI"])

Session = sessionmaker(bind=engine)
session = Session()