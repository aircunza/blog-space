type DomainEventAttributes = any;
interface DomainParams {
  aggregateId: string;
  eventId: string;
  occurredOn: Date;
  attributes: DomainEventAttributes;
}

export abstract class DomainEvent {
  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;

  constructor(params: DomainParams) {
    const { aggregateId, eventId, occurredOn } = params;
    this.aggregateId = aggregateId;
    this.eventId = eventId;
    this.occurredOn = occurredOn;
  }

  abstract toPrimitive(): DomainEventAttributes;

  static fromPrimitives(params: DomainParams): DomainEvent {
    throw new Error("Not implement method");
  }
}
