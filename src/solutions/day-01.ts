import fs from "fs";
import { BaseSolution } from "./base-solution.ts";

export default class Day01 extends BaseSolution {
  #startValue = 50;
  #maxAlternatives = 100;

  moves: number[];

  constructor(inputPath: string) {
    super(inputPath);

    this.moves = this.input
      .split("\n")
      .map((row) => row.trim())
      .map((move) =>
        move.at(0) === "L"
          ? -1 * Number(move.substring(1))
          : Number(move.substring(1))
      );
  }

  getPart1(): string {
    let zeroes = 0;
    let value = this.#startValue;

    for (const move of this.moves) {
      value += move;
      value %= this.#maxAlternatives;

      if (value < 0) {
        value = this.#maxAlternatives + value;
      }

      if (value === 0) {
        zeroes++;
      }
    }

    return zeroes.toString();
  }

  getPart2(): string {
    let zeroes = 0;
    let value = this.#startValue;

    for (const move of this.moves) {
      const fullRotations = Math.floor(Math.abs(move) / this.#maxAlternatives);
      zeroes += fullRotations;

      const partialMove = move % this.#maxAlternatives;
      let nextValue = value + partialMove;

      if (partialMove < 0 && nextValue < 0) {
        if (value > 0) {
          zeroes++;
        }
        nextValue += this.#maxAlternatives;
      } else {
        if (nextValue >= this.#maxAlternatives) {
          if (nextValue !== this.#maxAlternatives) {
            zeroes++;
          }
          nextValue %= this.#maxAlternatives;
        }
      }

      value = nextValue;

      if (value === 0) {
        zeroes++;
      }
    }

    return zeroes.toString();
  }
}
