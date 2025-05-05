import { StringValueObject } from "../../shared/domain/value-object/StringValueObject";
import { UnprocessableEntityError } from "../../shared/domain/value-object/UnprocessableEntityError";

export class AuthPassword extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new UnprocessableEntityError("Password must not be empty");
    }

    if (value.length < 6) {
      throw new UnprocessableEntityError(
        "Password must be at least 6 characters"
      );
    }

    if (value.length > 100) {
      throw new UnprocessableEntityError(
        "Password must not exceed 100 characters"
      );
    }
  }
}
