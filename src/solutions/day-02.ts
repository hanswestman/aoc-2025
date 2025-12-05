import { BaseSolution } from "./base-solution.ts";

type Range = { from: number; to: number };

export default class Day02 extends BaseSolution {
  ranges: Range[];

  constructor(inputPath: string) {
    super(inputPath);

    this.ranges = this.input.split(",").map((range) => {
      const [from, to] = range.split("-");

      return {
        from: Number(from),
        to: Number(to),
      } as Range;
    });
  }

  getPart1(): number {
    const sumOfInvalidIds: number = this.ranges.reduce((sum, range) => {
      return sum + this.getSumOfInvalidIdsInRangePart1(range);
    }, 0);

    return sumOfInvalidIds;
  }

  getPart2(): number {
    const sumOfInvalidIds: number = this.ranges.reduce((sum, range) => {
      return sum + this.#getSumOfInvalidIdsInRangePart2(range);
    }, 0);

    return sumOfInvalidIds;
  }

  getSumOfInvalidIdsInRangePart1(range: Range): number {
    return this.findInvalidIdsInRangePart1(range).reduce(
      (sum, invalidId) => sum + invalidId,
      0
    );
  }

  findInvalidIdsInRangePart1(range: Range): number[] {
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
    }

    return invalidIds;
  }

  #getSumOfInvalidIdsInRangePart2(range: Range): number {
    return this.#findInvalidIdsInRangePart2(range).reduce(
      (sum, invalidId) => sum + invalidId,
      0
    );
  }

  #findInvalidIdsInRangePart2(range: Range): number[] {
    const invalidIds: number[] = [];

    for (let i = range.from; i <= range.to; i++) {
      const value = i.toString();

      if (this.#valueContainsRepeatingPattern(value)) {
        invalidIds.push(i);
      }
    }

    return invalidIds;
  }

  #valueContainsRepeatingPattern(value: string): boolean {
    for (
      let sectionLength = Math.floor(value.length / 2);
      sectionLength > 0;
      sectionLength--
    ) {
      if (value.length % sectionLength !== 0) {
        continue;
      }

      const subValue = value.substring(0, sectionLength);
      const repeats = value.length / sectionLength;

      if (subValue.repeat(repeats) === value) {
        return true;
      }
    }

    return false;
  }
}
