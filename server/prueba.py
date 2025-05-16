from cortex import Cortex
from datetime import datetime, timedelta
from scipy.spatial.transform import Rotation as R

import time
import pyautogui
import numpy as np

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
    # forward = np.array([0, 0, 1])
    # up = np.array([0, 1, 0])
    # right = np.array([1, 0, 0])

    # forward_t = r_rel.apply(forward)
    # up_t = r_rel.apply(up)
    # right_t = r_rel.apply(right)

    # pitch = np.degrees(np.arcsin(-forward_t[1]))
    # roll = np.degrees(np.arctan2(up_t[0], up_t[2]))
    # yaw = np.degrees(np.arctan2(forward_t[0], forward_t[2]))

    return {"roll": roll, "pitch": pitch, "yaw": yaw}

def move_cursor(rotations):
    if rotations["roll"] >= 20:
        pyautogui.move(15, 0)
    elif rotations["roll"] <= -20:
        pyautogui.move(-15, 0)
    elif rotations["pitch"] >= 20:
        pyautogui.scroll(-100)
    elif rotations["pitch"] <= -20:
        pyautogui.scroll(100)

if __name__ == '__main__':
    cortex_api.open()
    cortex_api.ws_ready.wait()
    
    cortex_api.sub_request(["mot", "fac"])
    cortex_api.setup_profile("BrainNav", "load")

    start_time = datetime.now()
    duration = timedelta(seconds=30)

    # for _ in range(30):
    #     expression = get_expression(cortex_api)

    #     if expression:
    #         print(expression)

    #     time.sleep(0.1)

    print("Calibrando, quédate quieto...")
    baseline_quats = []
    for _ in range(30):
        expression = get_expression(cortex_api)
        
        if expression:
            q = leer_cuaternion(expression["mot"])
            baseline_quats.append(q)
        
        time.sleep(0.1)

    q_base = promedio_cuaterniones(baseline_quats)
    print("Baseline cuaternion:", q_base)

    while True:
        expression = get_expression(cortex_api)
        
        if expression:
            q_actual = leer_cuaternion(expression["mot"])

            rotations = orientacion_relativa(q_actual, q_base)
            print(f"Roll: {rotations['roll']:.2f}°, Pitch: {rotations['pitch']:.2f}°, Yaw: {rotations['yaw']:.2f}°")

            move_cursor(rotations)
        
        time.sleep(0.05)
       
        if datetime.now() - start_time >= duration:
            break

    cortex_api.close()