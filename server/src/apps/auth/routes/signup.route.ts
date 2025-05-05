import { NextFunction, Request, Response, Router } from "express";

import { SignupUserCtrl } from "../controllers/SignupUserCtrl";
import { container } from "../dependency-injection";

export function register(apiPath: string, router: Router) {
  // const repository = new SequelizeAuthRepository();
  // const passwordEncryptor = new BcryptPasswordEncryptor();
  // const usecase = new SignupUserUseCase(repository, passwordEncryptor);
  // const signuphandler = new SignupUserCommandHandler(usecase);
  // const commandBus = new CommandBus([signuphandler]);
  // const controller = new SignupUserCtrl(commandBus);
  const controller: SignupUserCtrl = container.get(
    "Apps.auth.controllers.SignupUserCtrl"
  );
  router.post(
    `${apiPath}/signup`,
    async function (req: Request, res: Response, next: NextFunction) {
      await controller.signup(req, res, next);
    }
  );
}
