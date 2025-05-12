import { DomainEventClass } from "../../../../shared/domain/event/DomainEvent";
import { IDomainEventSubscriber } from "../../../../shared/domain/event/IDomainEventSubscriber";
import { PostCreatedDomainEvent } from "../../../Posts/domain/events/PostCreatedDomainEvent";
import { PostsCounterIncrementer } from "./PostsCounterIncrementer";

export class IncrementPostsCounterOnPostCreated
  implements IDomainEventSubscriber<PostCreatedDomainEvent>
{
  constructor(private incrementer: PostsCounterIncrementer) {}

  subscribedTo(): DomainEventClass<PostCreatedDomainEvent>[] | [] {
    return [PostCreatedDomainEvent];
  }

  async handle(domainEvent: PostCreatedDomainEvent) {
    // TODO: implement what insert to run.
    await this.incrementer.run("new PostId(domainEvent.aggregateId");
  }
}
