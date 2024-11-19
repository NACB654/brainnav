from cortex import Cortex
from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta

import pyautogui
import keyboard
import time
import csv

app = Flask(__name__)
cors = CORS(app)

cortex_api = Cortex("HE4JKZSBkxPUDlzM0BRydxFtQb7aRycKG8BCVQT6", 
                    "kZzdxTGaZBosehGutm7OZloioepPS8QwZLzC1GJHRhexbIAwLG2azpFxznyQIjBcfXXCQlE1c26T7jzFY8mTtbyw0YeE3MUtEo7Z4QPj1atIA3IIPQkgOAUjRBhy7tUJ", 
                    debug_mode=True)

def get_expression(cortex_api):
    response = cortex_api.message_queue
    
    return response

def move_cursor(expression):
    eyes_action = expression["eyeAct"]
    upper_action = expression["uAct"]
    upper_power = expression["uPow"]
    lower_action = expression["lAct"]
    lower_power = expression["lPow"]
        
    if eyes_action == "winkR" and (upper_action == "neutral" or lower_action == "neutral"):
        pyautogui.move(30, 0)
    elif eyes_action == "winkL" and (upper_action == "neutral" or lower_action == "neutral"):
        pyautogui.move(-30, 0)
    elif upper_action == "surprise" and upper_power > 0.8:
        pyautogui.move(0, -20)
    elif lower_action == "smile" and lower_power > 0.8:
        pyautogui.move(0, 20)
    elif eyes_action == "blink" and (upper_action == "neutral" or lower_action == "neutral"):
        pyautogui.click()
        
def write_data(expression):
    with open("datos/expresiones.csv", mode="a", newline="") as file_csv:
        campos = ["eyeAct", "uAct", "uPow", "lAct", "lPow", "time"]
        
        
        write_csv = csv.DictWriter(file_csv, fieldnames=campos)
        if file_csv.tell() == 0:
            write_csv.writeheader()
            
        write_csv.writerow(expression)
        

@app.route("/run")
def run_test():
    start_time = datetime.now()
    duration = timedelta(minutes=1)
    
    count = 0
    last_blink = None
    
    while True:
        expression = get_expression(cortex_api)
        
        if expression:
            # if expression["eyeAct"] == "blink":
            #     current_time = time.time()
            #     if last_blink is None or (current_time - last_blink > 1):
            #         move_cursor(expression)
            #         count += 1
            #         last_blink = current_time
            # else:
            #     move_cursor(expression)

            write_data(expression)
            print(expression)
        
        time.sleep(0.05)
        
        if datetime.now() - start_time >= duration:
            break
       
        if keyboard.press("esc"):
            break
    
    return jsonify({"msg": "ok"}), 200
    
if __name__ == '__main__':
    cortex_api.open()
    cortex_api.ws_ready.wait()
    
    cortex_api.sub_request(["fac"])
    cortex_api.setup_profile("BrainNav", "load")
    
    app.run(debug=True)