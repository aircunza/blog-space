export abstract class Command {}

export type CommandClass<T extends Command> = {
  new (...args: any[]): T; // Class constructor - This indicates that the class should be a subclass of DomainEvent
};
