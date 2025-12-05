import { BaseSolution } from "./base-solution.ts";

type Range = { from: number; to: number };

export default class Day05 extends BaseSolution {
  freshRanges: Range[];
  ingredients: number[];

  constructor(inputPath: string) {
    super(inputPath);

    const [rangeRows, ingredientRows] = this.input.split("\n\n");

    this.freshRanges = rangeRows.split("\n").map((rangeRow) => {
      const [from, to] = rangeRow.split("-");

      return {
        from: Number(from),
        to: Number(to),
      };
    });

    this.ingredients = ingredientRows.split("\n").map((id) => Number(id));
  }

  getPart1(): number {
    return this.ingredients.filter(this.isIngredientFresh.bind(this)).length;
  }

  getPart2(): number {
    const ranges: Range[] = [
      ...this.freshRanges.map((range) => ({ from: range.from, to: range.to })),
    ];

    let couldMerge = true;

    do {
      couldMerge = this.mergeFirstOverlappingRange(ranges);
    } while (couldMerge);

    return ranges.reduce((sum, range) => sum + (range.to - range.from) + 1, 0);
  }

  isIngredientFresh(ingredient: number): boolean {
    for (const range of this.freshRanges) {
      if (ingredient >= range.from && ingredient <= range.to) {
        return true;
      }
    }

    return false;
  }

  mergeFirstOverlappingRange(ranges: Range[]): boolean {
    for (let a = 0; a < ranges.length; a++) {
      for (let b = 0; b < ranges.length; b++) {
        if (a === b) {
          continue;
        }

        if (this.canMergeRanges(ranges[a], ranges[b])) {
          const mergeIndex = Math.min(a, b);
          const removeIndex = Math.max(a, b);

          ranges[mergeIndex].from = Math.min(ranges[a].from, ranges[b].from);
          ranges[mergeIndex].to = Math.max(ranges[a].to, ranges[b].to);

          ranges.splice(removeIndex, 1);

          return true;
        }
      }
    }

    return false;
  }

  canMergeRanges(rangeA: Range, rangeB: Range): boolean {
    return (
      (rangeA.to >= rangeB.from && rangeA.to <= rangeB.to) || // A overlapping start of B
      (rangeA.from >= rangeB.from && rangeA.from <= rangeB.to) || // A overlapping end of B
      (rangeA.from <= rangeB.from && rangeA.to >= rangeB.to) // A completely overlaps B
    );
  }
}
