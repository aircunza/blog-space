import { Command } from "../../../shared/domain/command/Command";
import { ICommandHandler } from "../../../shared/domain/command/ICommandHandler";
import { SignupUserCommand } from "./SignupUserCommand";
import { SignupUserUseCase } from "./SignupUserUseCase";

export class SignupUserCommandHandler
  implements ICommandHandler<SignupUserCommand>
{
  constructor(private readonly useCase: SignupUserUseCase) {}
  subscribedTo(): Command {
    return SignupUserCommand;
  }

  async handle(command: SignupUserCommand): Promise<void> {
    await this.useCase.run(command);
  }
}
