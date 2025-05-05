export abstract class DomainError extends Error {
  private readonly _clientMessage: string;
  private readonly _errorCode: string;
  private readonly _statusCode: number;

  constructor(
    message: string,
    clientMessage?: string,
    errorCode = "DomainError",
    statusCode = 500
  ) {
    super(message);
    this._clientMessage = clientMessage ?? message;
    this._errorCode = errorCode;
    this._statusCode = statusCode;

    // Set the prototype explicitly for inheritance to work correctly

    Object.setPrototypeOf(this, new.target.prototype);
  }

  get errorCode(): string {
    return this._errorCode;
  }

  get clientMessage(): string {
    return this._clientMessage;
  }

  get statusCode(): number {
    return this._statusCode;
  }
}
