import { Query } from "./Query";

export interface IQueryHandler<Q extends Query, R> {
  subscribedTo(): Query;
  handle(query: Q): Promise<R>;
}
