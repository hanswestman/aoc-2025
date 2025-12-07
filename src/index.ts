import type {
  SolutionInterface,
  SolutionInterfaceConstructor,
} from "./solutions/solution-interface.ts";

const days = new Map<string, string>([
  ["01", "./solutions/day-01.ts"],
  ["02", "./solutions/day-02.ts"],
  ["03", "./solutions/day-03.ts"],
  ["04", "./solutions/day-04.ts"],
  ["05", "./solutions/day-05.ts"],
  ["06", "./solutions/day-06.ts"],
  ["07", "./solutions/day-07.ts"],
]);

async function solveDay(day: string, path: string) {
  const module = await import(path);
  const solutionClass: SolutionInterfaceConstructor = module.default;
  const solution: SolutionInterface = new solutionClass(`inputs/${day}.txt`);

  console.log(`Day ${day} Part 1: ${solution.getPart1()}`);
  console.log(`Day ${day} Part 2: ${solution.getPart2()}`);
}

if (process.argv.length > 2) {
  const day = process.argv[2];
  if (!days.has(day)) {
    console.log("No valid day selected.");
    process.exit(1);
  }

  await solveDay(day, days.get(day));
} else {
  for (const day of days.keys()) {
    await solveDay(day, days.get(day));
  }
}
