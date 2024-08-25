# -*- coding: utf-8 -*-
"""
Created on Sat Aug  3 20:57:31 2024

@author: shubh
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
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
    Age : int
    Sex : int
    ChestPainType : int
    RestingBP : int
    Cholesterol : int
    FastingBS : int
    RestingECG : int
    MaxHR : int
    ExerciseAngina : int
    Oldpeak : float
    ST_Slope : int
    
#loading the saved model
heart_disease_model = pickle.load(open('heart_disease.sav','rb'))
scaler = pickle.load(open('scaler.sav', 'rb'))
@app.post('/heart_disease')
async def heart_disease_pred(input_parameters : model_input):
    input_data = input_parameters.json()
    input_dictionary = json.loads(input_data)
    
    age = input_dictionary['Age']
    sex = input_dictionary['Sex']
    chestpaintype = input_dictionary['ChestPainType']
    restingbp = input_dictionary['RestingBP']
    cholestrol = input_dictionary['Cholesterol']
    fastingbs = input_dictionary['FastingBS']
    restingecg = input_dictionary['RestingECG']
    maxhr = input_dictionary['MaxHR']
    exerciseangina = input_dictionary['ExerciseAngina']
    oldpeak = input_dictionary['Oldpeak']
    stslope = input_dictionary['ST_Slope']
    
    input_list =[age, sex, chestpaintype,  restingbp, cholestrol, fastingbs, restingecg, maxhr, exerciseangina, oldpeak, stslope]
    
    # Column names in the same order as used in the DataFrame
    columns = ['Age', 'Sex', 'ChestPainType', 'RestingBP', 'Cholesterol', 'FastingBS', 'RestingECG', 'MaxHR', 'ExerciseAngina', 'Oldpeak', 'ST_Slope']
    
    # Create a DataFrame
    input_df = pd.DataFrame([input_list], columns=columns)
    

    # Scale the features using the previously fitted StandardScaler
    input_features_scaled = scaler.transform(input_df)
    
    # Predict the output using the trained SVM model
    predicted_output = heart_disease_model.predict(input_features_scaled)
    
    if  predicted_output[0] == 0:
        return 'No risk of Heart Disease'
    else:
        return 'Risk of Heart Disease'