import { InvalidArgumentError } from "../../shared/domain/value-object/InvalidArgumentError";
import { StringValueObject } from "../../shared/domain/value-object/StringValueObject";

export class AuthUsername extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUsername(value);
  }

  private ensureIsValidUsername(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new InvalidArgumentError("Username must not be empty");
    }

    if (value.length > 30) {
      throw new InvalidArgumentError("Username must be 30 characters or fewer");
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(value)) {
      throw new InvalidArgumentError("Username contains invalid characters");
    }
  }

  getValue(): string {
    return this.value;
  }
}
