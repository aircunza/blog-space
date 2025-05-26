import { NextFunction, Request, Response, Router } from "express";

import { configApps } from "../../../config";
import { CreatePostPostCtrl } from "../controllers/CreatePostPostCtrl";
import { container } from "../dependency-injection";

const controller: CreatePostPostCtrl = container.get(
  "Apps.posts.controllers.CreatePostPostCtrl"
);

export function register(router: Router) {
  router.post(
    `${configApps.apiVersionedPath}/create-post`,
    function (req: Request, res: Response, next: NextFunction) {
      controller.run(req, res, next);
    }
  );
}
