# -*- coding: utf-8 -*-
"""
Created on Sat Aug  3 22:24:14 2024

@author: shubh
"""

import json
import requests

url = 'http://127.0.0.1:8011/heart_disease'
#[[69, 1, 2, 140, 254, 0, 0, 146, 0, 2.0, 1]]
input_data_for_model = {
    'Age' : 69,#int
    'Sex' : 1,#int
    'ChestPainType' : 2,#int
    'RestingBP' : 140,#int
    'Cholesterol' : 254,#int
    'FastingBS' : 0,#int
    'RestingECG' : 0,#int
    'MaxHR' : 146,#int
    'ExerciseAngina' : 0,#int
    'Oldpeak' : 2.0,#float
    'ST_Slope' : 1,#int
    }

input_json = json.dumps(input_data_for_model)

response = requests.post(url, data=input_json)

print(response.text)