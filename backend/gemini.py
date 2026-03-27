from google import genai
import os
from dotenv import load_dotenv
import json

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def get_diagnosis(animal: str, symptoms: str, language: str) -> dict:
    prompt = f"""
You are an expert veterinary doctor AI called PashuMitra.

Farmer reported:
- Animal: {animal}
- Symptoms: {symptoms}
- Language: {language}

Respond ONLY in valid JSON:
{{
  "severity": "MILD" or "MODERATE" or "CRITICAL",
  "diagnosis": "short diagnosis name",
  "firstAid": ["step 1", "step 2", "step 3", "step 4"],
  "vetAdvice": "when to visit vet",
  "summary": "2 line simple explanation for farmer"
}}

Rules:
- If language is not English, write firstAid and summary in that language
- firstAid must have exactly 4 steps
- Only return JSON, nothing else
"""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    text = response.text.strip()

    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]

    return json.loads(text.strip())