import { DomainEvent, DomainEventClass } from "./DomainEvent";

export interface IDomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<DomainEventClass<T>>;
  handle: (domainEvent: T) => Promise<void>;
}
