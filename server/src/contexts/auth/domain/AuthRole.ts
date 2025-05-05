import { UnprocessableEntityError } from "../../shared/domain/value-object/UnprocessableEntityError";

export class AuthRole {
  private readonly value: string;
  private static readonly validRoles = ["user", "admin", "editor"];

  constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!AuthRole.validRoles.includes(value)) {
      throw new UnprocessableEntityError(`Invalid role: ${value}`);
    }
  }

  getValue(): string {
    return this.value;
  }

  toPrimitives(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: AuthRole): boolean {
    return this.value === other.getValue();
  }
}
