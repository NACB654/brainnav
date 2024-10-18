from cortex import Cortex
import pyautogui
import keyboard
import time

def get_expression(cortex_api):
    response = cortex_api.message_queue
    
    return response

def move_cursor(expression):
    eyes_action = expression["eyeAct"]
    upper_action = expression["uAct"]
    lower_action = expression["lAct"]
    
    if eyes_action == "winkR" and upper_action == "neutral":
        pyautogui.move(30, 0)
    elif eyes_action == "winkL" and upper_action == "neutral":
        pyautogui.move(-30, 0)
    elif upper_action == "surprise" and lower_action == "neutral":
        pyautogui.move(0, -30)
    elif lower_action == "smile" and eyes_action == "neutral":
        pyautogui.move(0, 30)
    elif eyes_action == "blink" and (upper_action == "neutral" or lower_action == "neutral"):
        pyautogui.click()
        

def main():
    cortex_api = Cortex("HE4JKZSBkxPUDlzM0BRydxFtQb7aRycKG8BCVQT6",
                        "kZzdxTGaZBosehGutm7OZloioepPS8QwZLzC1GJHRhexbIAwLG2azpFxznyQIjBcfXXCQlE1c26T7jzFY8mTtbyw0YeE3MUtEo7Z4QPj1atIA3IIPQkgOAUjRBhy7tUJ",
                        debug_mode=True)
    
    cortex_api.open()
    cortex_api.ws_ready.wait()
    
    cortex_api.sub_request(["fac"])
    cortex_api.setup_profile("BrainNav", "load")
    
    while True:
        expression = get_expression(cortex_api)
        
        if expression:
            move_cursor(expression)
            # print(expression)
        
        time.sleep(0.05)
        
        if keyboard.is_pressed("esc"):
           cortex_api.close()
           break
       
    cortex_api.websock_thread.join()
       
       
if __name__ == "__main__":
    main()