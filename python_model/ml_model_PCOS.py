# -*- coding: utf-8 -*-
"""
Created on Sun Aug  4 16:08:46 2024

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
    Weight : float
    Height : float
    Blood_Group : int
    Periods_Month : int
    Weight_gained_recently : int
    Excessive_hair_growth : int
    Skin_darkening : int
    Hair_loss : int
    Pimples : int
    Fast_food_regular : int
    Exercise_regular : int
    Mood_swings : int
    Periods_regular : int
    Period_days : int
    
#loading the saved model
PCOS_model = pickle.load(open('PCOS.sav','rb'))

@app.post('/PCOS')
async def covid_19_pred(input_parameters : model_input):
    input_data = input_parameters.json()
    input_dictionary = json.loads(input_data)
    
    age = input_dictionary['Age']
    weight = input_dictionary['Weight']
    height = input_dictionary['Height']
    blood_group = input_dictionary['Blood_Group']
    period_month = input_dictionary['Periods_Month']
    weight_gained_recently = input_dictionary['Weight_gained_recently']
    excessive_hair_growth = input_dictionary['Excessive_hair_growth']
    skin_darkening = input_dictionary['Skin_darkening']
    hair_loss = input_dictionary['Hair_loss']
    pimples = input_dictionary['Pimples']
    fast_food_regular = input_dictionary['Fast_food_regular']
    exercise_regular = input_dictionary['Exercise_regular']
    mood_swings = input_dictionary['Mood_swings']
    periods_regular = input_dictionary['Periods_regular']
    period_days = input_dictionary['Period_days']
    
    input_list =[age, weight, height,  blood_group, period_month, weight_gained_recently, excessive_hair_growth, skin_darkening, hair_loss, pimples, fast_food_regular, exercise_regular, mood_swings, periods_regular, period_days]
    
    prediction = PCOS_model.predict([input_list])
    if prediction[0] ==0:
        return 'The Person is not having PCOS'
    else:
        return 'The Person is having PCOS'