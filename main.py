import joblib
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, computed_field
from typing import Annotated
import pandas as pd

# Load your trained model
model = joblib.load('model/calories1_model.pkl')

# Create FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5500"] for specific frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for input
class People(BaseModel):
    age: Annotated[int, Field(..., gt=15, lt=60, description='Age of person between 15-60')]
    gender: Annotated[int, Field(..., description="Gender of person - 0: Female, 1: Male")]
    sleep_hours: Annotated[float, Field(..., description='Hours of sleep')]
    stress_level: Annotated[int, Field(..., gt=0, lt=11, description='Stress level 1-10')]
    weight_kg: Annotated[float, Field(..., description='Weight in kg')]

    @computed_field
    @property
    def bmi(self) -> float:
        return round(self.weight_kg * self.age, 2)

# Prediction endpoint
@app.post('/predict')
def predict_cal_burn(data: People):
    try:
        # Prepare input DataFrame
        input_df = pd.DataFrame([{
            'age': data.age,
            'gender': data.gender,
            'sleep_hours': data.sleep_hours,
            'stress_level': data.stress_level,
            'weight_kg': data.weight_kg,
            'bmi': data.bmi
        }])

        print("Input DataFrame:")
        print(input_df.head())
        print("Columns passed:", list(input_df.columns))

        # Make prediction
        prediction = float(model.predict(input_df)[0])

        # Return prediction
        return JSONResponse(status_code=200, content={'predict': prediction})

    except Exception as e:
        # Handle errors
        return JSONResponse(
            status_code=500,
            content={'error': 'Prediction failed', 'details': str(e)}
        )
