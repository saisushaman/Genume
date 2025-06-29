from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from ats_scoring import score_resume
from agents import run_agents
from utils import extract_text_from_pdf, extract_text_from_docx
from ollama_utils import call_mistral

app = FastAPI()  # <-- Define app here!

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "GenAI Resume Generator API is running."}

@app.post("/analyze")
async def analyze_resume(file: UploadFile, job_title: str = Form(...)):
    filename = file.filename.lower()
    try:
        file_bytes = await file.read()
        if filename.endswith(".pdf"):
            content = extract_text_from_pdf(file_bytes)
        elif filename.endswith(".docx"):
            content = extract_text_from_docx(file_bytes)
        else:
            return JSONResponse(status_code=400, content={"error": "Unsupported file format"})

        ats_result = score_resume(content, job_title)
        suggestions = run_agents(content, job_title)

        prompt = f"""
        You are an expert resume writer. Rewrite this resume to align better with the job title "{job_title}".
        Resume:
        '''{content}'''
        """
        improved_resume = call_mistral(prompt)

        return {
            "ats_result": ats_result,
            "suggestions": suggestions,
            "fixed_resume_text": improved_resume
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
