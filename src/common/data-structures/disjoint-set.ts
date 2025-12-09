export class DisjointSet<T> {
  private readonly parent: Map<T, T> = new Map();
  private readonly rank: Map<T, number> = new Map();
  private setCount: number = 0;

  makeSet(x: T): void {
    if (!this.parent.has(x)) {
      this.parent.set(x, x);
      this.rank.set(x, 0);
      this.setCount++;
    }
  }

  find(x: T): T {
    /*this.makeSet(x);
        if (this.parent.get(x) !== x) {
            this.parent.set(x, this.find(this.parent.get(x)!));
        }

        return this.parent.get(x)!;*/
    while (this.parent.get(x) !== x) {
      this.parent.set(x, this.parent.get(this.parent.get(x)));
      x = this.parent.get(x);
    }
    return x;
  }

  union(x: T, y: T): void {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) {
      return;
    }

    const rankX = this.rank.get(rootX)!;
    const rankY = this.rank.get(rootY)!;

    if (rankX > rankY) {
      this.parent.set(rootY, rootX);
    } else if (rankX < rankY) {
      this.parent.set(rootX, rootY);
    } else {
      this.parent.set(rootY, rootX);
      this.rank.set(rootX, rankX + 1);
    }

    this.setCount--;
  }

  areAllConnected(): boolean {
    return this.setCount === 1 && this.parent.size > 0;
  }
}
