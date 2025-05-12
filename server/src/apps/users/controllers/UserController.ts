import { Request, Response } from "express";

import { InMemoryCommandBus } from "../../../contexts/shared/infrastructure/CommandBus/InMemoryCommandBus";
import { CreateUserCommand } from "../../../contexts/users/application/create/CreateUserCommand";

export class UserController {
  constructor(private commandBus: InMemoryCommandBus) {}

  public run = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, username, email, password } = req.body;
      const command = new CreateUserCommand(id, username, email, password);

      await this.commandBus.dispatch(command);

      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
