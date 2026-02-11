import { ctx } from "../main.js"

//Mathとmath,convertが3種類あるクソコ()

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
  trigonometric: {
    convert (v) {
      return Array.isArray(v) ? v : [Math.sin(v), Math.cos(v)];
    },
    rotate(center, pos, dir) {
      const a = this.convert(dir);
      const d = math.sub(pos, center);
      return [d[0]*a[1]-d[1]*a[0],d[0]*a[0]-d[1]*a[1]]
    },
  }
};

function convert(Id, pos) { //Idのcanvasデータに基づいてposを計算します
  let tmp = math.mul(tmp, canvasData[Id].stretch)
  tmp = math.trigonometric.rotate([0,0], pos, canvasData[Id].catch.canvas)
  tmp = math.add(pos, canvasData[Id].origin)
  return tmp;
}

function newPen (Id = `pen${Object.keys(canvasData).length}`, opts = {}) {
  const data = {
    down: false,
    pos: opts.pos ?? [0,0],
    color: opts.color ?? "#000000",
    size: opts.size ?? 1,
    angle: opts.angle ?? 0,
    canvas: {
      origin: opts.origin ?? [0,0],
      stretch: opts.stretch ?? [1,1],
      angle: opts.angle ?? 0, 
    },
    catch: {
      pen: [0,1],
      canvas: [0,1]
    }
  }
  canvasData[Id] = data;
}

newPen() //初期で一本装備

export function pen(Id = "pen0") {
  return {
    setPos(pos) {
      canvasData[Id].pos = pos;
    },
    move(pos) {
      canvasData[Id].pos = add(canvasData[Id].pos, pos);
    },
    setDir(dir) {
      canvasData[Id].angle = dir;
      canvasData[Id].catch.pen = [Math.sin(dir), Math.cos(dir)];
    },
    rotate(dir) {
      const tmp = canvasData[Id].angle + dir;
      canvasData[Id].angle = tmp;
      canvasData[Id].catch.pen = [Math.sin(tmp), Math.cos(tmp)];
    }
  };
}
