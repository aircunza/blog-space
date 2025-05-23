import { FilterOperator } from "./FilterOperator";

export class Filter {
  public readonly field: string;
  public readonly operator: FilterOperator;
  public readonly value: any;

  constructor(field: string, operator: string | FilterOperator, value: any) {
    if (!field || typeof field !== "string") {
      throw new Error("Field must be a non-empty string");
    }

    this.field = field;

    // If we are passed a string, we try to create FilterOperator
    if (typeof operator === "string") {
      this.operator = FilterOperator.fromValue(operator);
    } else if (operator instanceof FilterOperator) {
      this.operator = operator;
    } else {
      throw new Error("Operator must be a string or FilterOperator instance");
    }

    this.value = value;
  }

  // Example of a method to represent the filter as a string
  toString(): string {
    return `${this.field} ${this.operator.value} ${this.value}`;
  }

  // Method to know if the filter is positive or negative
  isPositive(): boolean {
    return this.operator.isPositive();
  }
}
