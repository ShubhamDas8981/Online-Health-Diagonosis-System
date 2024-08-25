# -*- coding: utf-8 -*-
"""
Created on Sun Aug  4 10:23:26 2024

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
    Fever : int
    Tiredness : int
    DryCough : int
    DifficultyinBreathing : int
    SoreThroat : int
    None_Sympton : int
    Pains : int
    NasalCongestion : int
    RunnyNose	 : int
    Diarrhea : int
    None_Experiencing : int
    gender : int
    age : int
    contact : int
    
#loading the saved model
covid_19_model = pickle.load(open('COVID_19_Final.sav','rb'))
scaler_covid = pickle.load(open('covid_scalar.sav', 'rb'))

@app.post('/covid_19')
async def covid_19_pred(input_parameters : model_input):
    input_data = input_parameters.json()
    input_dictionary = json.loads(input_data)
    
    fever = input_dictionary['Fever']
    tiredness = input_dictionary['Tiredness']
    dryCough = input_dictionary['DryCough']
    difficultyinBreathing = input_dictionary['DifficultyinBreathing']
    soreThroat = input_dictionary['SoreThroat']
    noneSympton = input_dictionary['None_Sympton']
    pains = input_dictionary['Pains']
    nasalCongestion = input_dictionary['NasalCongestion']
    runnyNose = input_dictionary['RunnyNose']
    diarrhea = input_dictionary['Diarrhea']
    noneExperiencing = input_dictionary['None_Experiencing']
    Gender = input_dictionary['gender']
    Age = input_dictionary['age']
    Contact = input_dictionary['contact']
    
    input_list =[fever, tiredness, dryCough,  difficultyinBreathing, soreThroat, noneSympton, pains, nasalCongestion, runnyNose, diarrhea, noneExperiencing, Gender, Age, Contact]
    
    # Column names in the same order as used in the DataFrame
    columns = ['Fever', 'Tiredness', 'Dry-Cough', 'Difficulty-in-Breathing', 'Sore-Throat', 'None_Sympton', 'Pains', 'Nasal-Congestion', 'Runny-Nose', 'Diarrhea', 'None_Experiencing', 'gender', 'age', 'contact']
    
    # Create a DataFrame
    input_df = pd.DataFrame([input_list], columns=columns)
    
    # Scale the features using the previously fitted StandardScaler
    input_features_scaled = scaler_covid.transform(input_df)
    
    # Debugging: Print scaled input features
    #print("Scaled input features:", input_features_scaled)
    
    # Predict the output using the trained SVM model
    predicted_output = covid_19_model.predict(input_features_scaled)
    
    if  predicted_output[0] == 0:
        return 'No risk of COVID-19'
    else:
        return 'Risk of COVID-19'
    
    