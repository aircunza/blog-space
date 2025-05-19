import { NextFunction, Request, Response } from "express";

import { CreatePostCommand } from "../../../contexts/Posts/Posts/application/create/CreatePostCommand";
import { InMemoryCommandBus } from "../../../contexts/shared/infrastructure/CommandBus/InMemoryCommandBus";

export class CreatePostPostCtrl {
  constructor(private readonly commandBus: InMemoryCommandBus) {}
  public run = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id, title, content, authorId } = req.body;
      const command = new CreatePostCommand({ id, title, content, authorId });

      await this.commandBus.dispatch(command);

      res.status(201).json({ message: "Post created successfully" });
    } catch (err) {
      next(err);
    }
  };
}
