const touchpad = document.getElementById("touchpad");
const keyboard = document.getElementById("keyboard-input");
const leftClick = document.getElementById("left-click");
const rightClick = document.getElementById("right-click");

const ws = new WebSocket("ws://0.0.0.0:8000/ws");

leftClick.onclick = () => {
  send({ event: "left-click" });
};

const send = (data) => {
  ws.send(JSON.stringify(data));
};
