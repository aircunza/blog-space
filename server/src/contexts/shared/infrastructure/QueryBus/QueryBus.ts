// src/shared/application/QueryBus.ts
import { QueryHandler } from "./QueryHandler";

export class QueryBus {
  private handlers: Map<string, QueryHandler<any, any>> = new Map();

  register<Q, R>(queryName: string, handler: QueryHandler<Q, R>) {
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
