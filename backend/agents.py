# agents.py
from matplotlib import text
import language_tool_python
from language_tool_python import LanguageTool
from fuzzywuzzy import fuzz

tool = language_tool_python.LanguageTool('en-US')

def grammar_fix_agent(text: str) -> str:
    matches = tool.check(text)
    corrected = tool.correct(text)  # use the 'correct' method on your LanguageTool instance
    return corrected

def keyword_optimize_agent(text: str, keywords: list[str]) -> str:
    for kw in keywords:
        if kw.lower() not in text.lower():
            text += f"\n- {kw}"
    return text

def extract_keywords_from_job_title(job_title: str) -> list[str]:
    # Naive example: split job title into keywords, remove common stopwords (extend as needed)
    stopwords = {'and', 'or', 'the', 'of', 'in', 'for', 'with'}
    words = [w.strip().capitalize() for w in job_title.split() if w.lower() not in stopwords]
    return words

def run_agents(resume_text: str, job_title: str) -> dict:
    fixed_text = grammar_fix_agent(resume_text)
    keywords = extract_keywords_from_job_title(job_title)
    fixed_text = keyword_optimize_agent(fixed_text, keywords)

    recommendations = [
        "Improved grammar and style",
        f"Added keywords relevant to '{job_title}'"
    ]

    return {
        "fixed_text": fixed_text,
        "recommendations": recommendations
    }
