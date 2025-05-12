import { IResponse } from "./IResponse";
import { Query } from "./Query";

export interface IQueryBus {
  ask<R extends IResponse>(query: Query): Promise<R>;
}
