# GenAI Resume Generator

## Overview

GenAI Resume Generator is a full-stack application that allows users to upload resumes and input a job title to receive an ATS (Applicant Tracking System) score along with AI-powered suggestions to improve the resume. The backend is built with FastAPI and integrates Mistral LLM via Ollama for AI rewriting. The frontend is a React app providing an interactive interface for uploading resumes, displaying scores, suggestions, and enhanced resume text.

---

## How It Works

1. **Frontend**  
   - Upload resume files (`.pdf` or `.docx`) and input a target job title.  
   - Sends data to the FastAPI backend `/analyze` endpoint.

2. **Backend**  
   - Extracts text from uploaded resumes.  
   - Calculates ATS scores based on keyword matching, readability, and section completeness.  
   - Runs AI agents for grammar fixes and keyword optimization.  
   - Sends the resume and job title as a prompt to Mistral LLM (via Ollama) to rewrite the resume for better alignment.  
   - Returns ATS scores, suggestions, and the AI-enhanced resume text.

3. **Frontend**  
   - Displays ATS score dashboard, suggestions, and rewritten resume text.

---

## Project Structure

GenAI-Resume-Generator/
├── backend/
│ ├── main.py
│ ├── ats_scoring.py
│ ├── agents.py
│ ├── utils.py
│ ├── ollama_utils.py
│ ├── requirements.txt
├── frontend/
│ ├── package.json
│ ├── src/
│ │ ├── App.js
│ │ ├── components/
│ │ │ ├── ResumeForm.jsx
│ │ │ ├── ATSScore.jsx
│ │ │ ├── Recommendations.jsx
│ │ │ ├── ResumeTextPreview.jsx
│ │ └── index.js
├── README.md


---

## Dependencies & Setup

### Backend (FastAPI + Python)

- Python 3.8+
- fastapi
- uvicorn
- python-multipart
- pdfminer.six
- python-docx
- fuzzywuzzy
- textstat
- requests

**Install all backend dependencies:**

```bash
pip install fastapi uvicorn python-multipart pdfminer.six python-docx fuzzywuzzy textstat requests

### Frontend (React)
- Node.js & npm

- React (via Create React App)

#### Setup frontend
- cd frontend
- npm install
- npm start


#### Running the Project
- Start Ollama and pull Mistral model:

```bash
ollama pull mistral
ollama run mistral
Start Backend:

```bash
cd backend
uvicorn main:app --reload --port 8000
Start Frontend:

```bash
cd frontend
npm start

Open your browser at http://localhost:3000 to use the app.