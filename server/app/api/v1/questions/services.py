import re
from openai import OpenAI
from youtube_transcript_api import YouTubeTranscriptApi

from app.config import config_environemnt


def generate_questions(transcript: str, questions: int = 10, options: int = 4) -> str:
    client = OpenAI(
        api_key=config_environemnt["OPENAI_API_KEY"],
    )
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": f"""You are an AI designed to generate multiple-choice questions based on educational transcripts. Given the transcript of a YouTube video, your task is to create {questions} questions, each with {options} answer options. Only one of the options should be correct. Provide the response in the following JSON format:
                [
                        {{
                            "question": "Question text here",
                            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                            "correct_answer": "Correct option here"
                        }},
                        ...
                    ]
                
                Make sure the questions are relevant to the content of the transcript and the options reflect the main ideas from the video. The transcript will be educational in nature, and you should aim for clarity and accuracy in both the questions and answers.
                The text for this task is: {transcript}""",
            }
        ],
    )

    return completion.choices[0].message.content


def get_video_transcript(video_url: str) -> str:

    match = re.search(r"[?&]v=([^&]+)", video_url)
    video_id = match.group(1) if match else None

    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        if "Could not retrieve a transcript for the video" in transcript:
            return ""

        text = ""

        for item in transcript:
            text += item["text"]

        return text
    except Exception as e:
        return ""
