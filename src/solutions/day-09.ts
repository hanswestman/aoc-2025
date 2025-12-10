import { BaseSolution } from "./base-solution.ts";

type Position = { x: number; y: number };
type Box = { positionA: Position; positionB: Position; area: number };

export default class Day09 extends BaseSolution {
  corners: Position[];
  boxes: Box[] = [];

  constructor(inputPath: string) {
    super(inputPath);

    this.corners = this.input.split("\n").map((row) => {
      const [x, y] = row.split(",");

      return { x: Number(x), y: Number(y) };
    });

    for (let i = 0; i < this.corners.length - 1; i++) {
      for (let j = i + 1; j < this.corners.length; j++) {
        if (i === j) {
          continue;
        }

        this.boxes.push({
          positionA: this.corners[i],
          positionB: this.corners[j],
          area: this.getArea(this.corners[i], this.corners[j]),
        });
      }
    }

    this.boxes.sort((a, b) => b.area - a.area);
  }

  getPart1(): number {
    return this.boxes[0].area;
  }

  getPart2(): number {
    return 0;
  }

  getArea(a: Position, b: Position): number {
    return (Math.abs(b.x - a.x) + 1) * (Math.abs(b.y - a.y) + 1);
  }
}
