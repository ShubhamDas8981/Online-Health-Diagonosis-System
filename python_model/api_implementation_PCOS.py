# -*- coding: utf-8 -*-
"""
Created on Sun Aug  4 17:01:03 2024

@author: shubh
"""

import json
import requests

url = 'http://127.0.0.1:8012/PCOS'

input_data_for_model = {
    'Age' : 45,#int
    'Weight' : 40.0,#float
    'Height' : 150.0,#float
    'Blood_Group' : 13,#int
    'Periods_Month' : 2,#int
    'Weight_gained_recently' : 0,#int
    'Excessive_hair_growth' : 0,#int
    'Skin_darkening' : 0,#int
    'Hair_loss' : 1,#int
    'Pimples' : 0,#int
    'Fast_food_regular' : 0,#int
    'Exercise_regular' : 0,#int
    'Mood_swings' : 1,#int
    'Periods_regular' : 0,#int
    'Period_days' : 7,#int
    }

input_json = json.dumps(input_data_for_model)

response = requests.post(url, data=input_json)

print(response.text)