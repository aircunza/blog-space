import { v4 as uuidv4, validate } from "uuid";

import { InvalidArgumentError } from "./InvalidArgumentError";
import { StringValueObject } from "./StringValueObject";

export class Uuid extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
  }
  private ensureIsValidUuid(value: string) {
    if (!validate(value)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${value}>`
      );
    }
  }
  static random() {
    return new Uuid(uuidv4());
  }

  getValue(): string {
    return this.value;
  }
  toString(): string {
    return this.value;
  }
}
