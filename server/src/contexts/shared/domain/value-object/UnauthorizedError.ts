import { DomainError } from "./DomainError";

export class UnauthorizedError extends DomainError {
  constructor(message: string, clientMessage?: string) {
    super(message, clientMessage, new.target.name, 401);
  }
}
