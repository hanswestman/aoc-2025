import fs from "fs";
import { BaseSolution } from "./base-solution.ts";

export default class Day01 extends BaseSolution {
  getPart1(): string {
    const input = fs.readFileSync("inputs/01.txt", "utf8");
    const startValue = 50;
    const maxAlternatives = 100;

    let zeroes = 0;

    const moves = input
      .split("\n")
      .map((row) => row.trim())
      .map((move) =>
        move.at(0) === "L"
          ? -1 * Number(move.substring(1))
          : Number(move.substring(1))
      );

    let value = startValue;

    for (const move of moves) {
      value += move;
      value %= maxAlternatives;

      if (value < 0) {
        value = maxAlternatives + value;
      }

      if (value === 0) {
        zeroes++;
      }
    }

    return zeroes.toString();
  }

  getPart2(): string {
    const input = fs.readFileSync("inputs/01.txt", "utf8");
    const startValue = 50;
    const maxAlternatives = 100;

    let zeroes = 0;

    const moves = input
      .split("\n")
      .map((row) => row.trim())
      .map((move) =>
        move.at(0) === "L"
          ? -1 * Number(move.substring(1))
          : Number(move.substring(1))
      );

    let value = startValue;

    for (const move of moves) {
      const fullRotations = Math.floor(Math.abs(move) / maxAlternatives);
      zeroes += fullRotations;

      const partialMove = move % maxAlternatives;
      let nextValue = value + partialMove;

      if (partialMove < 0 && nextValue < 0) {
        if (value > 0) {
          zeroes++;
        }
        nextValue += maxAlternatives;
      } else {
        if (nextValue >= maxAlternatives) {
          if (nextValue !== maxAlternatives) {
            zeroes++;
          }
          nextValue %= maxAlternatives;
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
