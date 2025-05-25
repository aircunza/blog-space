import { Filter } from "./Filter";
import { Order } from "./Order";

export class Criteria {
  constructor(
    public readonly filters: Filter[] = [],
    public readonly orders: Order[] = [],
    public readonly limit?: number,
    public readonly cursor?: string | number
  ) {}

  hasFilters(): boolean {
    return this.filters.length > 0;
  }
}
