from fuzzywuzzy import fuzz
import textstat


def score_resume(resume_text: str, job_title: str):
    # Keyword match
    keyword_match_score = fuzz.partial_ratio(resume_text.lower(), job_title.lower())

    # Readability score
    readability_score = textstat.flesch_reading_ease(resume_text)
    readability = min(max(readability_score, 0), 100)  # normalize to 0-100

    # Section completeness (simple heuristic)
    essential_sections = ["experience", "education", "skills"]
    completeness = sum(1 for section in essential_sections if section in resume_text.lower()) / len(essential_sections) * 100

    # Final score as average
    final_score = round((keyword_match_score + readability + completeness) / 3)

    return {
        "final_score": final_score,
        "keyword_match": keyword_match_score,
        "readability": readability,
        "completeness": completeness
    }
