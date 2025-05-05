import { IPasswordEncryptor } from "../../../shared/domain/IPasswordEncryptor";
import { ConflictError } from "../../../shared/domain/value-object/ConflictError";
import { AuthEmail } from "../../domain/AuthEmail";
import { AuthPassword } from "../../domain/AuthPassword";
import { AuthRole } from "../../domain/AuthRole";
import { AuthUser } from "../../domain/AuthUser";
import { AuthUsername } from "../../domain/AuthUsername";
import { IAuthRepository } from "../../domain/IAuthRepository";
import { UserId } from "../../shared/domain/UserId";
import { SignupUserCommand } from "./SignupUserCommand";

export class SignupUserUseCase {
  constructor(
    private readonly repository: IAuthRepository,
    private readonly encryptor: IPasswordEncryptor
  ) {}

  async run(command: SignupUserCommand): Promise<void> {
    const id = new UserId(command.id);
    const username = new AuthUsername(command.username);
    const email = new AuthEmail(command.email);

    const existingById = await this.repository.findById(id);
    if (existingById) {
      throw new ConflictError("ID already in use");
    }

    const existingByEmail = await this.repository.findByEmail(email);
    if (existingByEmail) {
      throw new ConflictError("Email is already in use");
    }

    const plainPassword = new AuthPassword(command.password);
    const hashedValue = await this.encryptor.hash(plainPassword.getValue());
    const hashedPassword = new AuthPassword(hashedValue);

    const role = new AuthRole("user");

    const user = new AuthUser({
      id,
      username,
      email,
      password: hashedPassword,
      role,
    });

    await this.repository.save(user);
  }
}
