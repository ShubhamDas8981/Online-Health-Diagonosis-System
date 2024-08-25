# -*- coding: utf-8 -*-
"""
Created on Sat Aug  3 12:03:39 2024

@author: shubh
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing; adjust for production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

class model_input(BaseModel):
    gender : int
    age : float
    hypertension : int
    heart_disease : int
    smoking_history : int
    bmi : float
    HbA1c_level : float
    blood_glucose_level : int
    
#loading the saved model
diabetes_model = pickle.load(open('diabetes_model.sav','rb'))


@app.post('/diabetes_prediction')
async def diabetes_pred(input_parameters : model_input):
    
    input_data = input_parameters.json()
    input_dictionary = json.loads(input_data)
    
    Gender = input_dictionary['gender']
    Age = input_dictionary['age']
    Hypertension = input_dictionary['hypertension']
    Heart_disease = input_dictionary['heart_disease']
    Smoking = input_dictionary['smoking_history']
    BMI = input_dictionary['bmi']
    HbA1c = input_dictionary['HbA1c_level']
    Glucose = input_dictionary['blood_glucose_level']
    
    input_list =[Gender, Age, Hypertension,  Heart_disease, Smoking, BMI, HbA1c, Glucose]
    
    prediction = diabetes_model.predict([input_list])
    
    if prediction[0] ==0:
        return 'The Person is not Diabetic'
    else:
        return 'The Person is Diabetic'