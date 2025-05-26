import { Query } from "./Query";
import { Response } from "./Response";

export interface IQueryBus {
  ask<R extends Response>(query: Query): Promise<R>;
}
