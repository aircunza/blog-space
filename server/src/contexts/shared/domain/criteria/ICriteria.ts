import { IFilter } from "./IFilter";
import { IOrder } from "./IOrder";

export interface ICriteria {
  filters: IFilter[];
  order: IOrder;
  cursor?: string | number;
  limit: number;
}
