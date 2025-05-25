import { Filter } from "../../../../shared/domain/criteria/Filter";

export class SearchPostsByCriteriaQuery {
  readonly filters: Filter[];
  readonly orderBy?: string;
  readonly orderType?: string;
  readonly limit?: number;
  readonly cursor?: number;

  constructor(
    filters: Filter[],
    orderBy?: string,
    orderType?: string,
    limit?: number,
    cursor?: number
  ) {
    this.filters = filters;
    this.orderBy = orderBy;
    this.orderType = orderType;
    this.limit = limit;
    this.cursor = cursor;
  }
}
