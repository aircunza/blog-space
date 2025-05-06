import { Command } from "../../domain/command/Command";
import { ICommandBus } from "../../domain/command/ICommandBus";
import { ICommandHandler } from "../../domain/command/ICommandHandler";
import { CommandNotRegisteredError } from "../../domain/value-object/CommandNotRegisteredError";

export class CommandBus implements ICommandBus {
  private handlers = new Map<Command, ICommandHandler<Command>>();

  constructor(commandsHandler: Array<ICommandHandler<Command>>) {
    commandsHandler.forEach((handler) => {
      this.handlers.set(handler.subscribedTo(), handler);
    });
  }

  register<T extends Command>(
    commandName: string,
    handler: ICommandHandler<T>
  ) {
    this.handlers.set(commandName, handler as ICommandHandler<Command>);
  }

  get(command: Command): ICommandHandler<Command> {
    const handler = this.handlers.get(command.constructor);

    if (!handler) {
      throw new Error(`No handler found for command: ${command.constructor}`);
    }
    return handler;
  }

  async dispatch(command: Command) {
    const handler = this.handlers.get(command.constructor);
    if (!handler) {
      throw new CommandNotRegisteredError(command);
    }
    return await handler?.handle(command);
  }
}
