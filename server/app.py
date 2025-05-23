from cortex import Cortex
from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
from scipy.spatial.transform import Rotation as R

import pyautogui
import keyboard
import time

app = Flask(__name__)
app.config["Q_BASE"] = None
cors = CORS(app)

cortex_api = Cortex("HE4JKZSBkxPUDlzM0BRydxFtQb7aRycKG8BCVQT6", 
                    "kZzdxTGaZBosehGutm7OZloioepPS8QwZLzC1GJHRhexbIAwLG2azpFxznyQIjBcfXXCQlE1c26T7jzFY8mTtbyw0YeE3MUtEo7Z4QPj1atIA3IIPQkgOAUjRBhy7tUJ", 
                    debug_mode=True)


def get_expression(cortex_api):
    response = cortex_api.message_queue
    
    return response

def leer_cuaternion(expression):
    return [expression["Q1"], expression["Q2"], expression["Q3"], expression["Q0"]]

def promedio_cuaterniones(lista_q):
    r = R.from_quat(lista_q)
    mean_rot = R.mean(r)
    return mean_rot.as_quat()

def orientacion_relativa(q_actual, q_base):
    r_actual = R.from_quat(q_actual)
    r_base = R.from_quat(q_base)
    
    r_rel = r_actual * r_base.inv()
    
    roll, pitch, yaw = r_rel.as_euler('xyz', degrees=True)
    return {"roll": roll, "pitch": pitch, "yaw": yaw}

def move_cursor(expression):
    eyes_action = expression["fac"]["eyeAct"]
    upper_action = expression["fac"]["uAct"]
    upper_power = expression["fac"]["uPow"]
    lower_action = expression["fac"]["lAct"]
    lower_power = expression["fac"]["lPow"]
    roll = expression["mot"]["roll"]
    pitch = expression["mot"]["pitch"]
        
    if roll <= -20:
        pyautogui.move(-30, 0)
    elif roll >= 20:
        pyautogui.move(30, 0)
    elif upper_action == "surprise" and upper_power > 0.75:
        pyautogui.move(0, -20)
    elif lower_action == "smile" and lower_power > 0.75:
        pyautogui.move(0, 20)
    elif pitch >= 20:
        pyautogui.scroll(-100)
    elif pitch <= -20:
        pyautogui.scroll(100)
    elif eyes_action == "blink" and (upper_action == "neutral" or lower_action == "neutral"):
        pyautogui.click()

@app.route("/calibrate")
def calibrate_gyro():
    print("Calibrandoooo")

    try:
        baseline_quats = []

        for _ in range(30):
            expression = get_expression(cortex_api)
            
            if expression:
                q = leer_cuaternion(expression["mot"])
                baseline_quats.append(q)
            
            time.sleep(0.1)

        app.config["Q_BASE"] = promedio_cuaterniones(baseline_quats)
        
        return jsonify({"msg": "ok"}), 200
    except Exception as e:
        print(e)
        cortex_api.close()

        return  jsonify({"msg": "Error"}), 500    

@app.route("/run")
def run_test():
    q_base = app.config.get("Q_BASE")
    start_time = datetime.now()
    duration = timedelta(minutes=1)
    
    count = 0
    last_blink = None
    
    while True:
        expression = get_expression(cortex_api)
        
        if expression:
            q_actual = leer_cuaternion(expression["mot"])
            expression["mot"] = orientacion_relativa(q_actual, q_base)

            if expression["fac"]["eyeAct"] == "blink":
                current_time = time.time()
                if last_blink is None or (current_time - last_blink > 1):
                    move_cursor(expression)
                    count += 1
                    last_blink = current_time
            else:
                move_cursor(expression)

            # print(expression)
        
        time.sleep(0.05)
        
        if datetime.now() - start_time >= duration:
            break
       
        if keyboard.press("esc"):
            break
    
    cortex_api.close()
    
    return jsonify({"msg": "ok"}), 200
    
if __name__ == '__main__':
    cortex_api.open()
    cortex_api.ws_ready.wait()
    
    cortex_api.sub_request(["mot", "fac"])
    cortex_api.setup_profile("BrainNav", "load")

    app.run(debug=True)