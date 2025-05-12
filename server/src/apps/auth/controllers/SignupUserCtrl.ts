import { NextFunction, Request, Response } from "express";

import { SignupUserCommand } from "../../../contexts/auth/application/signup/SignupUserCommand";
import { InMemoryCommandBus } from "../../../contexts/shared/infrastructure/CommandBus/InMemoryCommandBus";

export class SignupUserCtrl {
  constructor(private readonly commandBus: InMemoryCommandBus) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, username, email, password } = req.body;

      const command = new SignupUserCommand(id, username, email, password);

      await this.commandBus.dispatch(command);

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  }
}
