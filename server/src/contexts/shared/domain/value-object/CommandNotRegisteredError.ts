import { Command } from "../command/Command";
import { DomainError } from "./DomainError";

export class CommandNotRegisteredError extends DomainError {
  constructor(command: Command) {
    super(
      `Command not registered: <${command.constructor.name}>`,
      new.target.name
    );
  }
}
