import { InvalidArgumentError } from "../../../../shared/domain/value-object/InvalidArgumentError";
import { StringValueObject } from "../../../../shared/domain/value-object/StringValueObject";

export class PostContent extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidContent(value);
  }
  private ensureIsValidContent(value: string): void {
    if (value.length < 3 || value.length > 1000) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${value}>`);
    }
  }
}
