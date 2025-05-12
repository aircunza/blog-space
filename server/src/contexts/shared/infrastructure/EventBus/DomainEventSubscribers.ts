import { DomainEvent } from "../../domain/event/DomainEvent";
import { IDomainEventSubscriber } from "../../domain/event/IDomainEventSubscriber";

export class DomainEventSubscribers {
  //It is exposed as a public property so that other classes (such as EventBus) can access and use it.
  constructor(public readonly items: IDomainEventSubscriber<DomainEvent>[]) {}
}
