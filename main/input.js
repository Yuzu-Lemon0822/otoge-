export const pointer = {
  x: 0,
  y: 0,
  down: false
};

window.addEventListener("pointerdown", e => {
  pointer.down = true;
  pointer.x = e.clientX;
  pointer.y = e.clientY;
});

window.addEventListener("pointermove", e => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
});

window.addEventListener("pointerup", () => {
  pointer.down = false;
});