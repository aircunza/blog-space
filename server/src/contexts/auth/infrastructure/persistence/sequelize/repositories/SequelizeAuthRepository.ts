import { AuthEmail } from "../../../../domain/AuthEmail";
import { AuthPassword } from "../../../../domain/AuthPassword";
import { AuthRole } from "../../../../domain/AuthRole";
import { AuthUser } from "../../../../domain/AuthUser";
import { AuthUsername } from "../../../../domain/AuthUsername";
import { IAuthRepository } from "../../../../domain/IAuthRepository";
import { UserId } from "../../../../shared/domain/UserId";
import { AuthUserModel } from "../models/AuthUserModel";

export class SequelizeAuthRepository implements IAuthRepository {
  async save(user: AuthUser): Promise<void> {
    await AuthUserModel.create({
      id: user.id.getValue(),
      username: user.username.getValue(),
      email: user.email.getValue(),
      password: user.password.getValue(),
      role: user.role.getValue(),
    });
  }

  async findById(id: UserId): Promise<AuthUser | null> {
    const record = await AuthUserModel.findOne({
      where: { email: id.toString() },
    });
    return record ? this.toDomain(record) : null;
  }

  async findByEmail(email: AuthEmail): Promise<AuthUser | null> {
    const record = await AuthUserModel.findOne({
      where: { email: email.toString() },
    });
    return record ? this.toDomain(record) : null;
  }

  async findByUsername(username: AuthUsername): Promise<AuthUser | null> {
    const record = await AuthUserModel.findOne({
      where: { username: username.toString() },
    });
    return record ? this.toDomain(record) : null;
  }

  private toDomain(record: any): AuthUser {
    return new AuthUser({
      id: new UserId(record.id),
      username: new AuthUsername(record.username),
      email: new AuthEmail(record.email),
      password: new AuthPassword(record.password),
      role: new AuthRole(record.role),
    });
  }
}
