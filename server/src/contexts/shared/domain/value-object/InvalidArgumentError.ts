import { DomainError } from "./DomainError";

export class InvalidArgumentError extends DomainError {
  constructor(message: string, clientMessage?: string) {
    super(message, clientMessage, new.target.name, 400);
  }
}
