export enum Operator {
  EQUAL = "=",
  NOT_EQUAL = "!=",
  GT = ">",
  LT = "<",
  CONTAINS = "CONTAINS",
  NOT_CONTAINS = "NOT_CONTAINS",
}

export class FilterOperator {
  constructor(public readonly value: Operator) {}

  static fromValue(value: string): FilterOperator {
    if (!(Object.values(Operator) as string[]).includes(value)) {
      throw new Error(`Invalid operator: ${value}`);
    }
    return new FilterOperator(value as Operator);
  }
}
