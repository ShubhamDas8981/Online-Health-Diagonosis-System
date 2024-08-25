# -*- coding: utf-8 -*-
"""
Created on Sun Aug  4 11:36:59 2024

@author: shubh
"""

import json
import requests

url = 'http://127.0.0.1:8013/covid_19'

input_data_for_model = {
    'Fever' : 0,#int
    'Tiredness' : 0,#int
    'DryCough' : 0,#int
    'DifficultyinBreathing' : 0,#int
    'SoreThroat' : 0,#int
    'None_Sympton' : 0,#int
    'Pains' : 0,#int
    'NasalCongestion' : 0,#int
    'RunnyNose'	 : 0,#int
    'Diarrhea' : 0,#int
    'None_Experiencing' : 0,#int
    'gender' : 2,#int
    'age' : 1,#int
    'contact' : 2,#int
    }

input_json = json.dumps(input_data_for_model)

response = requests.post(url, data=input_json)

print(response.text)