import { InvalidArgumentError } from "../../../shared/domain/value-object/InvalidArgumentError";
import { StringValueObject } from "../../../shared/domain/value-object/StringValueObject";

export class PostTitle extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidTitle(value);
  }
  private ensureIsValidTitle(value: string): void {
    if (value.length < 3 || value.length > 100) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${value}>`
      );
    }
  }
}
