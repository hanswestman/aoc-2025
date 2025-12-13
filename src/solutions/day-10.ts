import { add } from "../common/utilities/number-array.ts";
import { BaseSolution } from "./base-solution.ts";
import {
  init,
  type Arith,
  type ContextCtor,
} from "z3-solver";

class Machine {
  goal: number;
  binaryButtons: number[];
  buttons: number[][];
  joltages: number[];

  constructor(
    goal: number,
    binaryButtons: number[],
    buttons: number[][],
    joltages: number[]
  ) {
    this.goal = goal;
    this.binaryButtons = binaryButtons;
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

  async getPart2(): Promise<number> {
    const { Z3, Context } = await init();

    let sum = 0;

    for (const machine of this.machines) {
      //const result = this.getJoltagePressesBFS(machine);
      const result = await this.getMinButtonPressesWithZ3(machine, Context);

      sum += result;
    }

    return sum;
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
      matches[2]
        .trim()
        .split(" ")
        .map((numbers) => numbers.substring(1, numbers.length - 1))
        .map((numbers) => numbers.split(",").map(Number)),
      matches[3].split(",").map(Number)
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
    const combinations = this.getCombinations(machine.binaryButtons);
    let leastNumberOfPresses = 0;

    for (const combination of combinations) {
      let value = 0;

      for (const binaryButton of combination) {
        value ^= binaryButton;
      }

      if (
        value === machine.goal &&
        (combination.length < leastNumberOfPresses ||
          leastNumberOfPresses === 0)
      ) {
        leastNumberOfPresses = combination.length;
      }
    }

    return leastNumberOfPresses;
  }

  getCombinations(binaryButtons: number[]): number[][] {
    const n = binaryButtons.length;
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
          subset.push(binaryButtons[j]);
        }
      }

      // Can probably filter out those with length 0 and 1.

      combinations.push(subset);
    }

    return combinations;
  }

  async getMinButtonPressesWithZ3(
    machine: Machine,
    z3Context: ContextCtor
  ): Promise<number> {
    let presses;

    const { Int, Optimize } = z3Context("main");
    const optimizer = new Optimize();

    const variables: Arith<"main">[] = [];
    machine.buttons.forEach((_, index) => {
      const value = Int.const(String.fromCodePoint(index + 97));
      optimizer.add(value.ge(0));
      variables.push(value);
    });

    machine.joltages.forEach((joltage, joltageIndex) => {
      let condition: any = Int.val(0);

      machine.buttons.forEach((_, buttonIndex, buttons) => {
        if (buttons[buttonIndex].includes(joltageIndex)) {
          condition = condition.add(variables[buttonIndex]);
        }
      });

      condition = condition.eq(Int.val(joltage));
      optimizer.add(condition);
    });

    const sum = variables.reduce(
      (condition, value) => condition.add(value),
      Int.val(0)
    );

    optimizer.minimize(sum);

    if ((await optimizer.check()) === "sat") {
      presses = parseInt(optimizer.model().eval(sum).toString());
    }

    return presses;
  }

  // This was way to slow when joltage numbers becomes higher, works fine for example.
  getJoltagePressesBFS(machine: Machine): number {
    const goalKey = machine.joltages.join(",");
    const n = machine.joltages.length;
    const initialState = Array(n).fill(0);

    // The queue stores [current state array, number of presses]
    const queue: [number[], number][] = [[initialState, 0]];

    const visited = new Set([initialState.join(",")]);

    while (queue.length > 0) {
      const [currentState, presses] = queue.shift();

      if (currentState.join(",") === goalKey) {
        return presses;
      }

      if (presses > 100) {
        // TODO, maybe not needed
        console.log("Presses over 100, aborting path");
        continue;
      }

      for (const buttonIndices of machine.buttons) {
        const nextState = [...currentState];

        for (const index of buttonIndices) {
          if (nextState[index] < machine.joltages[index]) {
            nextState[index]++;
          } else {
            continue;
          }
        }

        const nextStateKey = nextState.join(",");

        if (!visited.has(nextStateKey)) {
          visited.add(nextStateKey);
          queue.push([nextState, presses + 1]);
        }
      }
    }

    console.log("No path found for ", machine);
    return -1;
  }
}
