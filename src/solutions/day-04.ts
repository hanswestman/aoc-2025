import { BaseSolution } from "./base-solution.ts";

export default class Day04 extends BaseSolution {
  grid: string[][] = [];

  constructor(inputPath: string) {
    super(inputPath);

    const rows = this.input.split("\n");

    for (let i = 0; i < rows.length; i++) {
      this.grid.push(rows[i].split(""));
    }
  }

  getPart1(): number {
    let sum = 0;

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0].length; x++) {
        if (this.grid[y][x] === "@" && this.getAdjacentRolls(x, y) < 4) {
          sum++;
        }
      }
    }

    return sum;
  }

  getPart2(): number {
    let sum = 0;
    let partialSum = 0;
    do {
      partialSum = 0;
      for (let y = 0; y < this.grid.length; y++) {
        for (let x = 0; x < this.grid[0].length; x++) {
          if (this.grid[y][x] === "@" && this.getAdjacentRolls(x, y) < 4) {
            this.grid[y][x] = "x";
            partialSum++;
          }
        }
      }

      sum += partialSum;
    } while (partialSum > 0);

    return sum;
  }

  getAdjacentRolls(posX, posY): number {
    let adjacentRolls = 0;
    for (let y = posY - 1; y <= posY + 1; y++) {
      for (let x = posX - 1; x <= posX + 1; x++) {
        if (
          y < 0 ||
          y >= this.grid.length ||
          x < 0 ||
          x > this.grid[0].length ||
          (posX === x && posY === y)
        ) {
          continue;
        }

        if (this.grid[y][x] === "@") {
          adjacentRolls++;
        }
      }
    }

    return adjacentRolls;
  }
}
