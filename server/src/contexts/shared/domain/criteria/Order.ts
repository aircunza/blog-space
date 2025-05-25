type Direction = "asc" | "desc";

export class Order {
  constructor(
    public readonly by: string,
    public readonly direction: Direction = "asc"
  ) {
    if (!["asc", "desc"].includes(direction)) {
      throw new Error(`Invalid direction: ${direction}`);
    }
  }
  static fromPrimitives(by: string, direction?: string): Order {
    const safeDirection = direction === "desc" ? "desc" : "asc";
    return new Order(by, safeDirection);
  }
  invert(): Order {
    return new Order(this.by, this.direction === "asc" ? "desc" : "asc");
  }

  toString(): string {
    return `${this.by} ${this.direction.toUpperCase()}`;
  }
}
