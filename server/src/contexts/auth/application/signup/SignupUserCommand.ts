import { Command } from "../../../shared/domain/command/Command";

export class SignupUserCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string
  ) {}
}
