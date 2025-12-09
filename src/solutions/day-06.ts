import { BaseSolution } from "./base-solution.ts";
import { add, multiply } from "../common/utilities/number-array.ts";

export default class Day06 extends BaseSolution {
  numbers: string[][];
  operators: string[];

  constructor(inputPath: string) {
    super(inputPath);

    const rows = this.input.split("\n");
    const columnStartIndices: number[] = [];

    const operatorsRow = rows.at(-1);
    for (let i = 0; i < operatorsRow.length; i++) {
      if (operatorsRow.at(i) !== " ") {
        columnStartIndices.push(i);
      }
    }

    this.numbers = rows.slice(0, -1).map((row) => {
      const rowNumbers = [];

      for (let i = 0; i < columnStartIndices.length; i++) {
        rowNumbers.push(
          row.substring(
            columnStartIndices[i],
            i === columnStartIndices.length - 1
              ? row.length
              : columnStartIndices[i + 1] - 1
          )
        );
      }

      return rowNumbers;
    });

    this.operators = operatorsRow
      .split("")
      .filter((character) => character !== " ");
  }

  getPart1(): number {
    return this.operators.reduce((sum, method, index) => {
      const numbers = this.getRegularColumnValues(index).map(Number);

      return sum + (method === "+" ? add(numbers) : multiply(numbers));
    }, 0);
  }

  getPart2(): number {
    return this.operators.reduce((sum, method, index) => {
      const regularValues = this.getRegularColumnValues(index);
      const numbers = this.convertNumbersToCephalopod(regularValues);

      return sum + (method === "+" ? add(numbers) : multiply(numbers));
    }, 0);
  }

  getRegularColumnValues(columnIndex: number): string[] {
    return this.numbers.map((numbersRow) => numbersRow[columnIndex]);
  }

  convertNumbersToCephalopod(regularValues: string[]): number[] {
    const numbers: number[] = [];

    for (let i = regularValues[0].length - 1; i >= 0; i--) {
      const characters = [];
      for (let rowNumber = 0; rowNumber < regularValues.length; rowNumber++) {
        characters.push(regularValues[rowNumber].at(i));
      }

      numbers.push(Number(characters.join("")));
    }

    return numbers;
  }
}
