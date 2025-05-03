import { Request, Response, Router } from "express";

import { UserController } from "../controllers/UserController";
import { container } from "../dependency-injection";

export function register(apiPath: string, router: Router) {
  const controller: UserController = container.get(
    "Apps.users.controllers.UserController"
  );

  router.post(
    `${apiPath}/create-user`,
    async function (req: Request, res: Response) {
      await controller.run(req, res);
    }
  );
}
