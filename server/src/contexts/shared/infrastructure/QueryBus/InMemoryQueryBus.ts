import { IQueryBus } from "../../domain/query/IQueryBus";
import { IQueryHandler } from "../../domain/query/IQueryHandler";
import { Query } from "../../domain/query/Query";
import { Response } from "../../domain/query/Response";

export class InMemoryQueryBus implements IQueryBus {
  // Query handlers:
  private handlers = new Map<Query, IQueryHandler<Query, Response>>();

  constructor(queryHandlers: Array<IQueryHandler<Query, Response>>) {
    queryHandlers.forEach((handler) => {
      this.handlers.set(handler.subscribedTo(), handler);
    });
  }

  register<Q extends Query>(
    queryName: string,
    handler: IQueryHandler<Q, Response>
  ) {
    this.handlers.set(queryName, handler);
  }

  // Query bus:
  async ask<R>(query: Query): Promise<R> {
    const handler = this.handlers.get(query.constructor);

    if (!handler) {
      throw new Error(`No handler found for query ${query}`);
    }

    return handler.handle(query) as Promise<R>;
  }
}
