/* canvas取得*/

const canvas = document.getElementById("canvas")
export const ctx = canvas.getContext("2d") //display.jsへ

function resize() {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
}

resize()
window.addEventListener("resize", resize)

function loop() {
  requestAnimationFrame(loop);
}
loop();