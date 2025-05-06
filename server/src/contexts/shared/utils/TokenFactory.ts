import { ITokenHandler } from "./ITokenHandler";
import { JWTToken } from "./JWTToken";

export class TokenFactory {
  static createToken(tokenType: string): ITokenHandler {
    switch (tokenType) {
      case "jwt":
        return new JWTToken();
      default:
        throw new Error("Not implemented");
    }
  }
}
