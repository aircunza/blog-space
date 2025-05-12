import { NextFunction, Request, Response } from "express";

import { AuthenticateUserCommand } from "../../../contexts/auth/application/authenticate/AuthenticateUserCommand";
import { InMemoryCommandBus } from "../../../contexts/shared/infrastructure/CommandBus/InMemoryCommandBus";

export class LoginUserCtrl {
  constructor(private readonly commandBus: InMemoryCommandBus) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const command = new AuthenticateUserCommand(email, password);

      const response = await this.commandBus.dispatch(command);

      res.cookie("authToken", response.authToken, { httpOnly: true });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
