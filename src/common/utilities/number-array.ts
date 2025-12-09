export function add(numbers: number[]): number {
  return numbers.reduce((sum, number) => sum + number, 0);
}

export function multiply(numbers: number[]): number {
  return numbers.reduce((sum, number) => sum * number, 1);
}
