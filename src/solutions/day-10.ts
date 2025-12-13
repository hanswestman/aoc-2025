import { add } from "../common/utilities/number-array.ts";
import { BaseSolution } from "./base-solution.ts";

class Machine {
  goal: number;
  buttons: number[];
  joltages: number[];

  constructor(goal: number, buttons: number[], joltages: number[]) {
    this.goal = goal;
    this.buttons = buttons;
    this.joltages = joltages;
  }
}

export default class Day10 extends BaseSolution {
  machines: Machine[];

  constructor(inputPath: string) {
    super(inputPath);

    this.machines = this.input.split("\n").map(this.parseMachine.bind(this));
  }

  getPart1(): number {
    return add(this.machines.map(this.getLeastNumberOfPresses.bind(this)));
  }

  getPart2(): number {
    return 0;
  }

  parseMachine(row: string): Machine {
    const matches = /\[(.*)\]( \(.*\))+ \{(.*)\}/.exec(row);

    return new Machine(
      this.parseLights(matches[1]),
      matches[2]
        .trim()
        .split(" ")
        .map((numbers) => numbers.substring(1, numbers.length - 1))
        .map((numbers) => numbers.split(",").map(Number))
        .map((numbers) => this.parseButton(numbers, matches[1].length)),
      matches[3]
        .substring(1, matches[3].length - 2)
        .split(",")
        .map(Number)
    );
  }

  parseLights(lights: string): number {
    return parseInt(
      lights
        .split("")
        .reverse()
        .join("")
        .replaceAll(".", "0")
        .replaceAll("#", "1"),
      2
    );
  }

  parseButton(lightIndices: number[], lightsLength: number): number {
    return parseInt(
      lightIndices
        .reduce((lights, index) => {
          lights[index] = "1";

          return lights;
        }, "0".repeat(lightsLength).split(""))
        .reverse()
        .join(""),
      2
    );
  }

  getLeastNumberOfPresses(machine: Machine): number {
    const combinations = this.getCombinations(machine.buttons);
    let leastNumberOfPresses = 0;

    for(const combination of combinations) {
      let value = 0;

      for(const button of combination){
        value ^= button;
      }

      if(
        value === machine.goal 
        && (
          combination.length < leastNumberOfPresses 
          || leastNumberOfPresses === 0
        )
      ) {
        leastNumberOfPresses = combination.length;
      }
    }

    return leastNumberOfPresses;
  }

  getCombinations(buttons: number[]): number[][] {
    const n = buttons.length;
    const totalSubsets = 2 ** n;
    const combinations = [];

    for (let i = 0; i < totalSubsets; i++) {
      const subset = [];

      for (let j = 0; j < n; j++) {
        /* Check if the j-th bit of the current number 'i' is set (1)
         * (i >> j) shifts the j-th bit to the 0-th position.
         * & 1 checks if that 0-th bit is 1.
         */
        if ((i >> j) & 1) {
          subset.push(buttons[j]);
        }
      }

      // Can probably filter out those with length 0 and 1.

      combinations.push(subset);
    }

    return combinations;
  }
}
