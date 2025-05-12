import { Uuid } from "../value-object/Uuid";

type DomainEventAttributes = any;
interface DomainParams {
  aggregateId: string;
  eventId: string;
  occurredOn: Date;
  attributes: DomainEventAttributes;
  eventName: string;
}

export abstract class DomainEvent {
  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(params: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    eventName: string;
  }) {
    const { aggregateId, eventId, occurredOn, eventName } = params;
    this.aggregateId = aggregateId;
    this.eventId = eventId || Uuid.random().value;
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }

  static EVENT_NAME: string;

  abstract toPrimitive(): DomainEventAttributes;

  static fromPrimitives(params: DomainParams): DomainEvent {
    throw new Error("Not implement method");
  }
}

export type DomainEventClass<T extends DomainEvent> = {
  new (...args: any[]): T; // Class constructor - This indicates that the class should be a subclass of DomainEvent
  EVENT_NAME: string; // Static property
  fromPrimitives(params: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
    attributes: DomainEventAttributes;
  }): DomainEvent; // Static method
};
