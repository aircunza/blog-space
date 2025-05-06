export class AuthResponse {
  private id: string;
  private username: string;
  private email: string;
  private role: string;
  private authToken: string;
  constructor(
    id: string,
    username: string,
    email: string,
    role: string,
    token: string
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.authToken = token;
  }
  public toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      roles: this.role,
      session: {
        authToken: this.authToken,
      },
    };
  }
}
