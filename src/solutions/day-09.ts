import { BaseSolution } from "./base-solution.ts";

type Corner = { x: number; y: number };
type Box = {
  top: number;
  left: number;
  bottom: number;
  right: number;
  area: number;
};
type Edge = { x1: number; y1: number; x2: number; y2: number };

export default class Day09 extends BaseSolution {
  corners: Corner[];
  boxes: Box[] = [];
  edges: Edge[] = [];

  constructor(inputPath: string) {
    super(inputPath);

    this.corners = this.input.split("\n").map((row) => {
      const [x, y] = row.split(",");

      return { x: Number(x), y: Number(y) };
    });

    for (let i = 0; i < this.corners.length - 1; i++) {
      this.edges.push({
        x1: this.corners[i].x,
        y1: this.corners[i].y,
        x2: this.corners[i + 1].x,
        y2: this.corners[i + 1].y,
      });

      for (let j = i + 1; j < this.corners.length; j++) {
        if (i === j) {
          continue;
        }

        this.boxes.push(this.getBox(this.corners[i], this.corners[j]));
      }
    }

    this.boxes.sort((a, b) => b.area - a.area);
  }

  getPart1(): number {
    return this.boxes[0].area;
  }

  getPart2(): number {
    const boundingBoxes: Box[] = this.corners.reduce((boxes, _, i) => {
      boxes.push(
        this.getBox(
          this.corners[i === 0 ? this.corners.length - 1 : i - 1],
          this.corners[i]
        )
      );

      return boxes;
    }, [] as Box[]);

    for (const box of this.boxes) {
      if (
        !boundingBoxes.some((boundingBox) =>
          this.aabbCollision(box, boundingBox)
        )
      ) {
        return box.area;
      }
    }

    return 0;
  }

  getBox(a: Corner, b: Corner): Box {
    return {
      top: Math.min(a.y, b.y),
      left: Math.min(a.x, b.x),
      bottom: Math.max(a.y, b.y),
      right: Math.max(a.x, b.x),
      area: this.getArea(a, b),
    };
  }

  getArea(a: Corner, b: Corner): number {
    return (Math.abs(b.x - a.x) + 1) * (Math.abs(b.y - a.y) + 1);
  }

  aabbCollision(a: Box, b: Box): boolean {
    const leftGap = a.left >= b.right;
    const rightGap = a.right <= b.left;
    const topGap = a.top >= b.bottom;
    const bottomGap = a.bottom <= b.top;

    return !(leftGap || rightGap || topGap || bottomGap);
  }
}
