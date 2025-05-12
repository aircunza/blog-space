import EventEmitter from "events";

import { DomainEvent } from "../../../domain/event/DomainEvent";
import { IDomainEventSubscriber } from "../../../domain/event/IDomainEventSubscriber";
import { IEventBus } from "../../../domain/event/IEventBus";

export class InMemoryAsyncEventBus extends EventEmitter implements IEventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach((event) => {
      this.emit(event.eventName, event);
    });
  }

  addSubscribers(subscribers: Array<IDomainEventSubscriber<DomainEvent>>) {
    subscribers.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((eventClass) => {
        this.on(eventClass.EVENT_NAME, subscriber.handle.bind(subscriber));
      });
    });
  }
}
