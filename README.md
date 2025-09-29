# 🥗 Calorie Burn Prediction API
This is a FastAPI web service that predicts calorie burn based on personal health data using a trained machine learning model.

# API URLs
**CODE_BY:** [tech_sarwesh](https://github.com/tech-sarwesh)

## Base URL 
```bash
https://calorie-model-1.onrender.com
```
All API requests are made to this base URL.
## Endpoint
```bash
https://calorie-model-1.onrender.com/predict
```
POST /predict
This endpoint takes user data and predicts calorie burn.

## Example of JSON Requests
```bash
{
  "age": 25,
  "gender": 1,
  "sleep_hours": 7,
  "stress_level": 5,
  "weight_kg": 70
}
```
## Example JSON Response:
```bash
{
  "predict": 2100.5
}
```
## Usage Example in Python
```bash
import requests

url = "https://calorie-model-1.onrender.com/predict"

data = {
    "age": 25,
    "gender": 1,
    "sleep_hours": 7,
    "stress_level": 5,
    "weight_kg": 70
}

response = requests.post(url, json=data)

if response.status_code == 200:
    result = response.json()
    print("Predicted Calories Burn:", result["predict"])
else:
    print("Error:", response.json())

```
## Demo of Calorie Burn Prediction

https://tech-sarwesh.github.io/Calorie-Burn-Prediction/

---

## ⚠️ Disclaimer

This calorie burn prediction model is for **demo purposes only**.
Predictions may **not be accurate** and should **not be used for medical or health decisions**. Use at your own risk.

---


