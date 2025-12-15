import { BaseSolution } from "./base-solution.ts";

export default class Day10 extends BaseSolution {
  devices: Map<string, string[]> = new Map();

  constructor(inputPath: string) {
    super(inputPath);

    this.input.split("\n").forEach((row) => {
      const [device, outputs] = row.split(": ");
      this.devices.set(device, outputs.split(" "));
    });
  }

  getPart1(): number {
    return this.findAllPathsFromYouToOut();
  }

  getPart2(): number {
    return this.findAllPathsFromSvrToOut();
  }

  findAllPathsFromYouToOut(currentPath: string = "you"): number {
    if (currentPath === "out") {
      return 1;
    }

    const childDevices = this.devices.get(currentPath) || [];

    return childDevices.reduce((sum, device) => {
      return sum + this.findAllPathsFromYouToOut(device);
    }, 0);
  }

  findAllPathsFromSvrToOut(
    currentDevice: string = "svr",
    visitedDac: boolean = false,
    visitedFft: boolean = false,
    memory: Map<string, number> = new Map()
  ): number {
    const memoryKey = [
      currentDevice,
      visitedDac ? 1 : 0,
      visitedFft ? 1 : 0,
    ].join(",");

    if (memory.has(memoryKey)) {
      return memory.get(memoryKey);
    }

    if (currentDevice === "out") {
      return visitedDac && visitedFft ? 1 : 0;
    }

    if (currentDevice === "dac") {
      visitedDac = true;
    } else if (currentDevice === "fft") {
      visitedFft = true;
    }

    const childDevices = this.devices.get(currentDevice) || [];

    const sum = childDevices.reduce((sum, device) => {
      return (
        sum +
        this.findAllPathsFromSvrToOut(device, visitedDac, visitedFft, memory)
      );
    }, 0);

    memory.set(memoryKey, sum);

    return sum;
  }
}
