import { IQueryHandler } from "../../domain/query/IQueryHandler";
import { Query } from "../../domain/query/Query";

export class QueryBus {
  private handlers: Map<string, IQueryHandler<any, any>> = new Map();

  register<Q, R>(queryName: string, handler: IQueryHandler<Query, Response>) {
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
