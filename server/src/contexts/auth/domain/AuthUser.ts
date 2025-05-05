import { UserId } from "../shared/domain/UserId";
import { AuthEmail } from "./AuthEmail";
import { AuthPassword } from "./AuthPassword";
import { AuthRole } from "./AuthRole";
import { AuthUsername } from "./AuthUsername";

interface AuthUserProps {
  id: UserId;
  username: AuthUsername;
  email: AuthEmail;
  password: AuthPassword;
  role: AuthRole;
}

export class AuthUser {
  constructor(private readonly props: AuthUserProps) {}

  get id(): UserId {
    return this.props.id;
  }

  get username(): AuthUsername {
    return this.props.username;
  }

  get email(): AuthEmail {
    return this.props.email;
  }

  get password(): AuthPassword {
    return this.props.password;
  }

  get role(): AuthRole {
    return this.props.role;
  }

  toPrimitives() {
    return {
      id: this.id.getValue(),
      username: this.username.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
      roles: this.role.getValue(),
    };
  }
}
