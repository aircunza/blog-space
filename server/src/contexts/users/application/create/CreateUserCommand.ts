import { Command } from "../../../shared/domain/command/Command";

export class CreateUserCommand extends Command {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string
  ) {
    super();
  }
}
