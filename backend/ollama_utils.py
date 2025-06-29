import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def call_mistral(prompt: str, model: str = "mistral") -> str:
    try:
        res = requests.post(OLLAMA_URL, json={
            "model": model,
            "prompt": prompt,
            "stream": False
        })
        res.raise_for_status()
        return res.json().get("response", "").strip()
    except Exception as e:
        print(f"[Mistral Error] {e}")
        return "LLM processing failed."
