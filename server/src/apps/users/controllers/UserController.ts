import { Request, Response } from "express";

import { CommandBus } from "../../../contexts/shared/infrastructure/CommandBus/CommandBus";
import { CreateUserCommand } from "../../../contexts/users/domain/commands/CreateUserCommand";

export class UserController {
  constructor(private commandBus: CommandBus) {}

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
