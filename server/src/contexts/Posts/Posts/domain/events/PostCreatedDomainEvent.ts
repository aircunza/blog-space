import { DomainEvent } from "../../../../shared/domain/event/DomainEvent";

export class PostCreatedDomainEvent extends DomainEvent {
  static EVENT_NAME = "post.created";

  readonly title: string;
  readonly content: string;
  readonly authorId: string;

  constructor({
    title,
    content,
    authorId,
    aggregateId,
    eventId,
    occurredOn,
  }: {
    title: string;
    content: string;
    authorId: string;
    //
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({
      aggregateId,
      eventId,
      occurredOn,
      eventName: PostCreatedDomainEvent.EVENT_NAME,
    });
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }

  toPrimitive() {
    return {
      title: this.title,
      content: this.content,
      authorId: this.authorId,
    };
  }
}
