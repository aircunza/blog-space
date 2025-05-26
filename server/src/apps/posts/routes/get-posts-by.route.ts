import { NextFunction, Request, Response, Router } from "express";

import { configApps } from "../../../config";
import { PostsGetCtrl } from "../controllers/PostsGetCtrl";
import { container } from "../dependency-injection";

const controller: PostsGetCtrl = container.get(
  "Apps.posts.controllers.PostsGetCtrl"
);

export function register(router: Router) {
  router.get(
    `${configApps.apiVersionedPath}/get-posts-by`,
    (req: Request, res: Response, next: NextFunction) => {
      controller.run(req, res, next);
    }
  );
}
