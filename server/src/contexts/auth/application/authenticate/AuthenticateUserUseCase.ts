import { IPasswordEncryptor } from "../../../shared/domain/IPasswordEncryptor";
import { UnauthorizedError } from "../../../shared/domain/value-object/UnauthorizedError";
import { TokenFactory } from "../../../shared/utils/TokenFactory";
import { AuthEmail } from "../../domain/AuthEmail";
import { AuthPassword } from "../../domain/AuthPassword";
import { IAuthRepository } from "../../domain/IAuthRepository";
import { AuthResponse } from "../dtos/AuthResponse";
import { AuthenticateUserCommand } from "./AuthenticateUserCommand";

export class AuthenticateUserUseCase {
  constructor(
    private readonly repository: IAuthRepository,
    private readonly encryptor: IPasswordEncryptor
  ) {}

  async run(command: AuthenticateUserCommand): Promise<AuthResponse> {
    const email = new AuthEmail(command.email);
    const password = new AuthPassword(command.password);

    const existingUser = await this.repository.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedError("User does not exist");
    }

    const hashedPassword = existingUser.password;

    const isValidPassword = await this.encryptor.compare(
      hashedPassword.toString(),
      password.toString()
    );
    if (!isValidPassword) {
      throw new UnauthorizedError("Password incorrect");
    }

    const userId = existingUser.id;

    const tokenFactory = TokenFactory.createToken("jwt");

    const token = await tokenFactory.createToken({
      id: userId.toString(),
      role: existingUser.role.toString(),
    });

    return new AuthResponse(
      existingUser.id.toString(),
      existingUser.username.toString(),
      existingUser.email.toString(),
      existingUser.role.toString(),
      token
    );
  }
}
