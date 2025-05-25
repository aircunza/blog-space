import { IQueryHandler } from "../../domain/query/IQueryHandler";
import { Query } from "../../domain/query/Query";

export class InMemoryQueryBus {
  private handlers: Map<string, IQueryHandler<any, any>> = new Map();

  register<Q extends Query, R>(
    queryName: string,
    handler: IQueryHandler<Q, R>
  ) {
    this.handlers.set(queryName, handler);
  }

  async ask<Q, R>(queryName: string, query: Q): Promise<R> {
    const handler = this.handlers.get(queryName);
    if (!handler) {
      throw new Error(`No handler found for query ${queryName}`);
    }
    return handler.handle(query);
  }
}
