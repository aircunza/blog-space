import { InvalidArgumentError } from "../../shared/domain/value-object/InvalidArgumentError";
import { StringValueObject } from "../../shared/domain/value-object/StringValueObject";

export class AuthEmail extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (!this.isValidEmail(value)) {
      throw new InvalidArgumentError(`Invalid email: ${value}`);
    }
  }

  private isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  getValue(): string {
    return this.value;
  }
}
