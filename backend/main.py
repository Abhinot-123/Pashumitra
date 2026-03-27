from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gemini import get_diagnosis
from database import init_db, save_case, get_all_cases

app = FastAPI()

init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class DiagnosisRequest(BaseModel):
    animal: str
    symptoms: str
    language: str
    farmer_name: str = "Unknown"
    phone: str = ""
    district: str = ""

@app.get("/")
def root():
    return {"message": "PashuMitra backend running!"}

@app.post("/diagnose")
def diagnose(req: DiagnosisRequest):
    try:
        result = get_diagnosis(req.animal, req.symptoms, req.language)
        save_case({
            "farmer_name": req.farmer_name,
            "phone": req.phone,
            "district": req.district,
            "animal": req.animal,
            "symptoms": req.symptoms,
            "language": req.language,
            "severity": result["severity"],
            "diagnosis": result["diagnosis"],
            "firstAid": result["firstAid"],
            "vetAdvice": result["vetAdvice"],
            "summary": result["summary"]
        })
        return {"success": True, "data": result}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/cases")
def cases():
    try:
        all_cases = get_all_cases()
        return {"success": True, "data": all_cases}
    except Exception as e:
        return {"success": False, "error": str(e)}
