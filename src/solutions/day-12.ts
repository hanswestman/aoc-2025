import { add } from "../common/utilities/number-array.ts";
import { BaseSolution } from "./base-solution.ts";

type Shape = string[];
type Region = { size: string; amounts: number[] };

export default class Day12 extends BaseSolution {
  shapes: Shape[];
  regions: Region[];

  shapeMaxWidth: number;
  shapeMaxHeight: number;
  shapeMaxBlocks: number;

  constructor(inputPath: string) {
    super(inputPath);

    const splitMatch = /\n\n\d+x/.exec(this.input);

    const shapeRows = this.input.substring(0, splitMatch.index);
    const regionRows = this.input.substring(splitMatch.index);

    this.shapes = shapeRows
      .split(/\n\n/)
      .map((rows) => rows.replace(/\d:\n/, ""))
      .map((rows) => rows.split("\n"));

    this.regions = regionRows
      .trim()
      .split("\n")
      .map((row) => {
        const [size, amounts] = row.split(": ");

        return { size, amounts: amounts.split(" ").map(Number) };
      });

    this.shapeMaxHeight = Math.max(...this.shapes.map((shape) => shape.length));
    this.shapeMaxWidth = Math.max(
      ...this.shapes.map((shape) => shape[0].length)
    );
    this.shapeMaxBlocks = Math.max(
      ...this.shapes.map((shape) => shape.join("").match(/#/g).length)
    );
  }

  getPart1(): number {
    let sumFits = 0;
    let sumMaybeFits = 0;

    for (const region of this.regions) {
      const [regionWidth, regionHeight] = region.size.split("x").map(Number);

      const totalArea = regionWidth * regionHeight;
      const totalNumberOfShapes = add(region.amounts);
      const shapedThatWillFitWithoutPacking =
        Math.floor(regionWidth / this.shapeMaxWidth) *
        Math.floor(regionHeight / this.shapeMaxHeight);

      if (totalArea < totalNumberOfShapes * this.shapeMaxBlocks) {
        //console.log("Does not fit in region", region);

        continue;
      }

      if (totalNumberOfShapes < shapedThatWillFitWithoutPacking) {
        sumFits++;
      } else {
        sumMaybeFits++;
      }
    }

    return sumFits + sumMaybeFits;
  }

  getPart2(): number {
    return 0;
  }
}
