import { IQueryHandler } from "../../domain/query/IQueryHandler";
import { Query } from "../../domain/query/Query";
import { Response } from "../../domain/query/Response";
import { QueryNotRegisteredError } from "../../domain/value-object/QueryNotRegisteredError";

export class QueryHandlers extends Map<Query, IQueryHandler<Query, Response>> {
  constructor(
    private readonly queryHandlers: Array<IQueryHandler<Query, Response>>
  ) {
    super();
    queryHandlers.forEach((handler) => {
      this.set(handler.subscribedTo(), handler);
    });
  }
  getQueryHandler(query: Query): IQueryHandler<Query, Response> {
    const queryHandler = this.get(query);
    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }
    return queryHandler;
  }
}
