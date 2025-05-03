import { Command } from "../../../shared/domain/Command";
import { CommandHandler } from "../../../shared/infrastructure/CommandBus/CommandBus";
import { CreateUserCommand } from "../../domain/commands/CreateUserCommand";
import { UserCreator } from "./UserCreator";

export class CreateUserCommandHandler
  implements CommandHandler<CreateUserCommand>
{
  constructor(private readonly userCreator: UserCreator) {}

  subscribedTo(): Command {
    return CreateUserCommand;
  }

  async handle(command: CreateUserCommand): Promise<void> {
    const { id, username, email, password } = command;

    await this.userCreator.run({
      id,
      username,
      email,
      password,
    });
  }
}
