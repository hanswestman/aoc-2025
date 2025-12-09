import { BaseSolution } from "./base-solution.ts";
import { multiply } from "../common/utilities/number-array.ts";
import { DisjointSet } from "../common/data-structures/disjoint-set.ts";

type Edge = { a: number; b: number; distance: number };

export default class Day08 extends BaseSolution {
  junctionBoxes: string[];
  distances: Edge[] = [];
  limit: number = 1000;
  disjointSet = new DisjointSet<number>();

  productOfThreeLargestCircuitsAtLimit: number;
  lastConnectedJunctionBoxesProduct: number;

  constructor(inputPath: string) {
    super(inputPath);

    this.junctionBoxes = this.input.split("\n");

    this.calculateDistances();

    this.distances.sort((a, b) => a.distance - b.distance);

    for (let i = 0; i < this.junctionBoxes.length; i++) {
      this.disjointSet.makeSet(i);
    }

    for (let i = 0; i < this.distances.length; i++) {
      const edge = this.distances[i];
      this.disjointSet.union(edge.a, edge.b);

      if (i === this.limit) {
        this.productOfThreeLargestCircuitsAtLimit =
          this.getProductOfThreeLargestCircuits();
      }

      if (this.disjointSet.areAllConnected()) {
        const firstX = Number(this.junctionBoxes[edge.a].split(",")[0]);
        const secondX = Number(this.junctionBoxes[edge.b].split(",")[0]);

        this.lastConnectedJunctionBoxesProduct = firstX * secondX;

        return;
      }
    }
  }

  getPart1(): number {
    return this.productOfThreeLargestCircuitsAtLimit;
  }

  getPart2(): number {
    return this.lastConnectedJunctionBoxesProduct;
  }

  calculateDistances(): void {
    for (let i = 0; i < this.junctionBoxes.length; i++) {
      for (let j = i + 1; j < this.junctionBoxes.length; j++) {
        if (i === j) {
          continue;
        }

        this.distances.push({
          a: i,
          b: j,
          distance: this.getDistance(
            this.junctionBoxes[i],
            this.junctionBoxes[j]
          ),
        });
      }
    }
  }

  getDistance(positionA: string, positionB: string): number {
    const [x1, y1, z1] = positionA.split(",").map(Number);
    const [x2, y2, z2] = positionB.split(",").map(Number);

    let x = Math.abs(x1 - x2);
    let y = Math.abs(y1 - y2);
    let z = Math.abs(z1 - z2);

    return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  }

  getProductOfThreeLargestCircuits(): number {
    const sizeMap = new Map();
    for (let i = 0; i < this.junctionBoxes.length; i++) {
      const r = this.disjointSet.find(i);
      sizeMap.set(r, (sizeMap.get(r) || 0) + 1);
    }

    const sizes = [...sizeMap.values()].toSorted((a, b) => b - a);

    return multiply(sizes.slice(0, 3));
  }
}
