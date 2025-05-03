import { Command } from "../../domain/Command";

export interface CommandHandler<T extends Command> {
  handle(command: T): Promise<any>;
  subscribedTo: () => Command;
}

export class CommandBus {
  private handlers = new Map<Command, CommandHandler<Command>>();

  constructor(commandsHandler: Array<CommandHandler<Command>>) {
    commandsHandler.forEach((handler) => {
      this.handlers.set(handler.subscribedTo(), handler);
    });
  }

  register<T extends Command>(commandName: string, handler: CommandHandler<T>) {
    this.handlers.set(commandName, handler as CommandHandler<Command>);
  }

  get(command: Command): CommandHandler<Command> {
    const handler = this.handlers.get(command.constructor);

    if (!handler) {
      throw new Error(`No handler found for command: ${command.constructor}`);
    }
    return handler;
  }

  async dispatch(command: Command) {
    const handler = this.handlers.get(command.constructor);
    if (!handler) {
      throw new Error(`No handler found for command: ${command.constructor}`);
    }
    await handler?.handle(command);
  }
}
