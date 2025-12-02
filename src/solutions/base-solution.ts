import fs from "fs";
import type { SolutionInterface } from "./solution-interface.ts";

export abstract class BaseSolution implements SolutionInterface {
  input: string;

  constructor(inputPath: string) {
    this.input = fs.readFileSync(inputPath, "utf8");
  }

  abstract getPart1(): string;
  abstract getPart2(): string;
}
