import { DomainError } from "./DomainError";

export class UnprocessableEntityError extends DomainError {
  constructor(message: string, clientMessage?: string) {
    super(message, clientMessage, new.target.name, 422);
  }
}
