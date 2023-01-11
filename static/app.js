const touchpad = document.getElementById("touchpad");
const keyboardInput = document.getElementById("keyboard-input");
const mouseLeft = document.getElementById("mouse-left");
const mouseRight = document.getElementById("mouse-right");

const HOSTNAME = "192.168.2.56";
const SENSITIVITY = 2.25;
const MOVE_RATE_MS = 80;

const ws = new WebSocket(`ws://${HOSTNAME}:8000/ws`);

var blockTouchpad = false;

var prevMouseX;
var prevMouseY;

touchpad.ontouchmove = (e) => {
  if (blockTouchpad) return;

  var touch = e.touches[0];
  var x = touch.pageX;
  var y = touch.pageY;

  if (!prevMouseX || !prevMouseY) {
    prevMouseX = x;
    prevMouseY = y;
    return;
  }
  relativeX = x - prevMouseX;
  relativeY = y - prevMouseY;

  prevMouseX = x;
  prevMouseY = y;

  send({
    event: "mouse-move",
    position: { x: relativeX * SENSITIVITY, y: relativeY * SENSITIVITY },
  });

  blockTouchpad = true;
  setTimeout(() => {
    blockTouchpad = false;
  }, MOVE_RATE_MS);
};

mouseLeft.onclick = () => {
  send({ event: "mouse-left" });
};

touchpad.ontouchend = () => {
  prevMouseX = undefined;
  prevMouseY = undefined;
};

mouseRight.onclick = () => {
  send({ event: "mouse-right" });
};

const send = (data) => {
  ws.send(JSON.stringify(data));
};
