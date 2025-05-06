import { NextFunction, Request, Response, Router } from "express";

import { container } from "../dependency-injection";

export function register(apiPath: string, router: Router) {
  const controller = container.get("Apps.auth.controllers.LoginUserCtrl");
  router.post(
    `${apiPath}/login`,
    async function (req: Request, res: Response, next: NextFunction) {
      controller.run(req, res, next);
    }
  );
}
