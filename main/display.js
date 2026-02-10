import { ctx } from "../main.js"

const canvasData = {}

const math = {
  convert (v) {
    return Array.isArray(v) ? v : [v, v];
  },

  calc (v1, v2, op) {
    const [a, b] = this.convert(v1);
    const [c, d] = this.convert(v2);
    return [op(a, c), op(b, d)];
  },

  add(v1, v2) { return this.calc(v1, v2, (a, b) => a + b); },
  sub(v1, v2) { return this.calc(v1, v2, (a, b) => a - b); },
  mul(v1, v2) { return this.calc(v1, v2, (a, b) => a * b); },
  div(v1, v2) { return this.calc(v1, v2, (a, b) => a / b); },
};

function newPen (Id = `pen${Object.keys(canvasData).length}`, opts = {}) {
  const data = {
    down: false,
    pos: [0,0] ?? opts.pos,
    color: "#000000" ?? opts.color,
    size: 1 ?? opts.size,
  }
  canvasData[Id] = data;
}

newPen() //初期で一本装備

export function pen(Id = "pen0") {
  return {
    set(pos) {
      canvasData[Id] = pos;
    }
  };
}