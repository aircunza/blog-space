import { IResponse } from "./IResponse";
import { Query } from "./Query";

export interface IQueryHandler<Q extends Query, R extends IResponse> {
  subscribedTo(): Query;
  handle(query: Q): Promise<R>;
}
