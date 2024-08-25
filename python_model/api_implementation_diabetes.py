# -*- coding: utf-8 -*-
"""
Created on Sat Aug  3 12:47:25 2024

@author: shubh
"""

import json
import requests

url = 'http://127.0.0.1:8010/diabetes_prediction'

input_data_for_model = {
    'gender' : 1 ,#int
    'age' : 55.0,#float
    'hypertension' : 0,#int
    'heart_disease' : 0,#int
    'smoking_history' : 1,#int
    'bmi' : 23.45,#float
    'HbA1c_level' : 5.0,#float
    'blood_glucose_level' : 155#int
    }

input_json = json.dumps(input_data_for_model)

response = requests.post(url, data=input_json)

print(response.text)