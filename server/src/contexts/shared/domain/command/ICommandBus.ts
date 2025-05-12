import { Command, CommandClass } from "./Command";

export interface ICommandBus {
  dispatch<T extends Command>(command: CommandClass<T>): Promise<void>;
}
