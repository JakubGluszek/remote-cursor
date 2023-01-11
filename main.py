import pyautogui
from fastapi import FastAPI, WebSocket
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    with open("static/index.html") as f:
        return HTMLResponse(content=f.read())

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        event = data["event"]
        match event:
            case "mouse-left":
                pyautogui.leftClick()
            case "mouse-right":
                pyautogui.rightClick()
            case "mouse-move":
                # position {x, y} (relative)
                x = data["position"]["x"]
                y = data["position"]["y"]

                pyautogui.moveRel(x,y)
            case "keys":
                print("keys")

