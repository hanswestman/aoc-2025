import type { SolutionInterface } from "./solution-interface.ts";

export abstract class BaseSolution implements SolutionInterface {
  constructor() {}

  abstract getPart1(): string;
  abstract getPart2(): string;
}
