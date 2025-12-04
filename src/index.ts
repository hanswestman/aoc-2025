import type { SolutionInterface, SolutionInterfaceConstructor } from "./solutions/solution-interface.ts";

const days = new Map<string, string>([
  ["01", "./solutions/day-01.ts"],
  ["02", "./solutions/day-02.ts"],
  ["03", "./solutions/day-03.ts"],
  ["04", "./solutions/day-04.ts"],
]);

async function getSolutions(day: string, path: string) {
  const module = await import(path);
  const solutionClass: SolutionInterfaceConstructor = module.default;
  const solution: SolutionInterface = new solutionClass(`inputs/${day}.txt`);

  console.log(`Part 1: ${solution.getPart1()}`);
  console.log(`Part 2: ${solution.getPart2()}`);
}

if (process.argv.length > 2) {
  const day = process.argv[2];
  if (!days.has(day)) {
    console.log("No valid day selected.");
    process.exit(1);
  }

  console.log(`Day ${day}`);

  await getSolutions(day, days.get(day));
}
