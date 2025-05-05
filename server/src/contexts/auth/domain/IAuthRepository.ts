import { UserId } from "../shared/domain/UserId";
import { AuthEmail } from "./AuthEmail";
import { AuthUser } from "./AuthUser";
import { AuthUsername } from "./AuthUsername";

export interface IAuthRepository {
  save(user: AuthUser): Promise<void>;
  findById(id: UserId): Promise<AuthUser | null>;
  findByEmail(email: AuthEmail): Promise<AuthUser | null>;
  findByUsername(username: AuthUsername): Promise<AuthUser | null>;
}
