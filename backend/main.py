from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from ats_scoring import score_resume
from agents import run_agents
from utils import extract_text_from_pdf, extract_text_from_docx, generate_pdf
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_resume(file: UploadFile, job_title: str = Form(...)):
    if file.filename.endswith(".pdf"):
        content = extract_text_from_pdf(await file.read())
    elif file.filename.endswith(".docx"):
        content = extract_text_from_docx(await file.read())
    else:
        return {"error": "Unsupported file format"}

    ats_result = score_resume(content, job_title)
    suggestions = run_agents(content, job_title)
    return {"ats_result": ats_result, "suggestions": suggestions, "resume_text": content}