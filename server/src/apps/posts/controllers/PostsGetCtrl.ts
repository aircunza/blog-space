import { NextFunction, Request, Response } from "express";

import { SearchPostsByCriteriaQuery } from "../../../contexts/Posts/Posts/application/find/SearchPostsByCriteriaQuery";
import { Filter } from "../../../contexts/shared/domain/criteria/Filter";
import { FilterOperator } from "../../../contexts/shared/domain/criteria/FilterOperator";
import { InMemoryQueryBus } from "../../../contexts/shared/infrastructure/QueryBus/InMemoryQueryBus";

export class PostsGetCtrl {
  constructor(private readonly queryBus: InMemoryQueryBus) {}

  async run(req: Request, res: Response, next: NextFunction) {
    try {
      const { field, operator, value, orderBy, orderType, limit, cursor } =
        req.query;

      const filters: Filter[] = [];
      if (field && operator && value) {
        const filterOperator = FilterOperator.fromValue(operator as string);
        filters.push(
          new Filter(field as string, filterOperator, value as string)
        );
      }

      const limitNumber = limit ? Number(limit) : undefined;
      const cursorNumber = cursor ? Number(cursor) : undefined;

      const query = new SearchPostsByCriteriaQuery(
        filters,
        orderBy as string | undefined,
        orderType as string | undefined,
        limitNumber,
        cursorNumber
      );

      const posts = await this.queryBus.ask<SearchPostsByCriteriaQuery, any>(
        "SearchPostsByCriteriaQuery",
        query
      );

      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
