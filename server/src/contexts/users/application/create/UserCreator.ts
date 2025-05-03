import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class UserCreator {
  constructor(private readonly repository: IUserRepository) {}
  async run(params: {
    id: string;
    username: string;
    email: string;
    password: string;
  }) {
    await this.repository.save({
      id: params.id,
      username: params.username,
      email: params.email,
      password: params.password,
      role: "user",
    });
  }
}
