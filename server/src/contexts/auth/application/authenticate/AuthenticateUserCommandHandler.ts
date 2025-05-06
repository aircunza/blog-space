import { Command } from "../../../shared/domain/command/Command";
import { ICommandHandler } from "../../../shared/domain/command/ICommandHandler";
import { AuthResponse } from "../dtos/AuthResponse";
import { AuthenticateUserCommand } from "./AuthenticateUserCommand";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserCommandHandler
  implements ICommandHandler<AuthenticateUserCommand>
{
  constructor(private readonly authenticator: AuthenticateUserUseCase) {}
  subscribedTo(): Command {
    return AuthenticateUserCommand;
  }

  async handle(command: AuthenticateUserCommand): Promise<AuthResponse> {
    const response = await this.authenticator.run(command);
    return response;
  }
}
