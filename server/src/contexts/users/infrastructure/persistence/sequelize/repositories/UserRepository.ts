import { User } from "../../../../domain/entities/User";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { UserModel } from "../models/UserModel";

export class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    const record = await UserModel.create({ ...user });

    return new User(
      record.id,
      record.username,
      record.email,
      record.password,
      record.role
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await UserModel.findOne({ where: { email } });
    return record
      ? new User(
          record.id,
          record.username,
          record.email,
          record.password,
          record.role
        )
      : null;
  }

  async findById(id: string): Promise<User | null> {
    const record = await UserModel.findByPk(id);
    return record
      ? new User(
          record.id,
          record.username,
          record.email,
          record.password,
          record.role
        )
      : null;
  }
}
