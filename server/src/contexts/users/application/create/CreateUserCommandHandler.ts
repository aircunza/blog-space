import { Command } from "../../../shared/domain/Command";
import { ICommandHandler } from "../../../shared/domain/ICommandHandler";
import { CreateUserCommand } from "./CreateUserCommand";
import { UserCreator } from "./UserCreator";

export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
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
