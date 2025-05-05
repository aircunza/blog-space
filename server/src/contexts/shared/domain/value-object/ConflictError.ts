import { DomainError } from "./DomainError";

export class ConflictError extends DomainError {
  constructor(message: string, clientMessage?: string) {
    super(message, clientMessage, "ConflictError", 409);
  }
}
