import type { SolutionInterface } from "./solutions/solution-interface.ts";

const days = new Map<string, string>([["01", "./solutions/day-01.ts"]]);

async function getSolutions(day: string, path: string) {
  const module = await import(path);
  const solutionClass: { new (): SolutionInterface } = module.default;
  const solution: SolutionInterface = new solutionClass();

  console.log(`Part 1: ${solution.getPart1()}`);
  console.log(`Part 2: ${solution.getPart2()}`);
}

if (process.argv.length > 2) {
  const day = process.argv[2];
  if (!/^([0][1-9]|[1][0-9]|[2][0-5])$/.test(day)) {
    console.log("No valid day selected.");
    process.exit(1);
  }

  console.log(`Day ${day}`);

  if (days.has(day)) {
    await getSolutions(day, days.get(day));
  }
}
