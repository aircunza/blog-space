import { Filter } from "./Filter";
import { Order } from "./Order";

export class Criteria {
  readonly filters: Filter[];
  readonly orders: Order[];
  readonly limit?: number;
  readonly cursor?: string | number;

  constructor(
    filters: Filter[],
    orders: Order[],
    limit?: number,
    cursor?: string | number
  ) {
    this.filters = filters;
    this.orders = orders;
    this.limit = limit;
    this.cursor = cursor;
  }

  public hasFilters(): boolean {
    return this.filters.length > 0;
  }
}
