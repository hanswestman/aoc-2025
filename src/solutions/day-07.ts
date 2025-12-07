import { BaseSolution } from "./base-solution.ts";

type Position = { x: number; y: number };

export default class Day07 extends BaseSolution {
  grid: string[][];
  splits: Set<string> = new Set();
  beams: Map<string, number> = new Map();
  timelines: number;

  constructor(inputPath: string) {
    super(inputPath);

    this.grid = this.input.split("\n").map((row) => row.split(""));

    const startPosition = this.getStartPosition();

    this.timelines = this.createBeam(startPosition.x, startPosition.y + 1);
  }

  getPart1(): number {
    return this.splits.size;
  }

  getPart2(): number {
    return this.timelines + 1;
  }

  getStartPosition(): Position {
    return {
      x: this.grid[0].indexOf("S"),
      y: 0,
    };
  }

  createBeam(x: number, y: number): number {
    const key = [x, y].join(",");

    if (this.beams.has(key)) {
      return this.beams.get(key);
    }

    while (this.grid[y][x] !== "^") {
      y++;

      if (y >= this.grid.length) {
        return 0;
      }
    }

    this.splits.add([x, y].join(","));

    this.beams.set(key, 1);

    this.beams.set(key, this.beams.get(key) + this.createBeam(x - 1, y));
    this.beams.set(key, this.beams.get(key) + this.createBeam(x + 1, y));

    return this.beams.get(key);
  }
}
