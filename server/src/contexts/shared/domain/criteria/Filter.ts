import { FilterOperator } from "./FilterOperator";

export class Filter {
  constructor(
    public readonly field: string,
    public readonly operator: FilterOperator,
    public readonly value: any
  ) {
    if (!field) throw new Error("Field must be a non-empty string");
  }
}
