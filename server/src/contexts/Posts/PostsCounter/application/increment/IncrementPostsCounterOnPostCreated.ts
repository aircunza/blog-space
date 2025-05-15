import { DomainEventClass } from "../../../../shared/domain/event/DomainEvent";
import { IDomainEventSubscriber } from "../../../../shared/domain/event/IDomainEventSubscriber";
import { PostCreatedDomainEvent } from "../../../Posts/domain/events/PostCreatedDomainEvent";
import { PostId } from "../../../Posts/domain/value-object/PostId";
import { PostsCounterIncrementer } from "./PostsCounterIncrementer";

export class IncrementPostsCounterOnPostCreated
  implements IDomainEventSubscriber<PostCreatedDomainEvent>
{
  constructor(private incrementer: PostsCounterIncrementer) {}

  subscribedTo(): DomainEventClass<PostCreatedDomainEvent>[] | [] {
    return [PostCreatedDomainEvent];
  }

  async handle(domainEvent: PostCreatedDomainEvent) {
    const postId = new PostId(domainEvent.aggregateId);
    const authorId = domainEvent.authorId;
    await this.incrementer.increment(postId, authorId);
  }
}
