import { NextFunction, Request, Response, Router } from "express";

import { configApps } from "../../../config";
import { PostsByCriteriaSearcher } from "../../../contexts/Posts/Posts/application/find/PostsByCriteriaSearcher";
import { SearchPostsByCriteriaQueryHandler } from "../../../contexts/Posts/Posts/application/find/SearchPostsByCriteriaQueryHandler";
import { PostPostgresqlRepository } from "../../../contexts/Posts/Posts/infrastructure/persistence/sequelize/repository/PostPostgresqlRepository";
import { InMemoryQueryBus } from "../../../contexts/shared/infrastructure/QueryBus/InMemoryQueryBus";
import { PostsGetCtrl } from "../controllers/PostsGetCtrl";

const repository = new PostPostgresqlRepository();
const useCase = new PostsByCriteriaSearcher(repository);
const queryHandler = new SearchPostsByCriteriaQueryHandler(useCase);
const queryBus = new InMemoryQueryBus();

// Register the query handler in the query bus
queryBus.register("SearchPostsByCriteriaQuery", queryHandler);

const controller = new PostsGetCtrl(queryBus);

export function register(router: Router) {
  router.get(
    `${configApps.apiVersionedPath}/get-posts-by`,
    (req: Request, res: Response, next: NextFunction) => {
      controller.run(req, res, next);
    }
  );
}
