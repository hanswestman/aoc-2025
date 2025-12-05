import { BaseSolution } from "./base-solution.ts";

export default class Day03 extends BaseSolution {
  rows: string[];

  constructor(inputPath: string) {
    super(inputPath);

    this.rows = this.input.split("\n");
  }

  getPart1(): number {
    let sum = 0;

    for (const row of this.rows) {
      sum += Number(this.getJoltages(row, 2, 0));
    }

    return sum;
  }

  getPart2(): number {
    let sum = 0;

    for (const row of this.rows) {
      sum += Number(this.getJoltages(row, 12, 0));
    }

    return sum;
  }

  getJoltages(
    row: string,
    batteries: number,
    fromIndex: number,
    result: string = ""
  ): string {
    if (batteries === 0) {
      return result;
    }

    const topValue = row
      .substring(fromIndex, row.length - batteries + 1)
      .split("")
      .toSorted()
      .reverse()[0];

    return this.getJoltages(
      row,
      batteries - 1,
      row.indexOf(topValue, fromIndex) + 1,
      result + topValue
    );
  }
}
