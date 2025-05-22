export interface IFilter {
  field: string;
  operator: "=" | ">" | "<" | "LIKE";
  value: any;
}
