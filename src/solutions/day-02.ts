import fs from "fs";
import { BaseSolution } from "./base-solution.ts";

type Range = { from: number; to: number };

export default class Day01 extends BaseSolution {
  getPart1(): string {
    const input = fs.readFileSync("inputs/02.txt", "utf8");

    const sumOfInvalidIds: number = input
      .split(",")
      .map((range) => {
        const [from, to] = range.trim().split("-");

        return {
          from: Number(from),
          to: Number(to),
        } as Range;
      })
      .reduce((sum, range) => {
        return sum + this.#getSumOfInvalidIdsInRange(range);
      }, 0);

    return sumOfInvalidIds.toString();
  }

  getPart2(): string {
    return "todo";
  }

  #getSumOfInvalidIdsInRange(range: Range): number {
    return this.#findInvalidIdsInRange(range).reduce(
      (sum, invalidId) => sum + invalidId,
      0
    );
  }

  #findInvalidIdsInRange(range: Range): number[] {
    const invalidIds: number[] = [];

    for (let i = range.from; i <= range.to; i++) {
      const value = i.toString();

      if (value.length % 2 === 1) {
        continue;
      }

      const part1 = value.substring(0, value.length / 2);
      const part2 = value.substring(value.length / 2);

      if (part1 === part2) {
        invalidIds.push(i);
      }

      //console.log(value, " -> ", part1, part2);
    }

    return invalidIds;
  }
}
