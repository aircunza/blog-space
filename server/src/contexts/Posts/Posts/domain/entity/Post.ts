import { AggregateRoot } from "../../../../shared/domain/AggregateRoot";
import { PostCreatedDomainEvent } from "../events/PostCreatedDomainEvent";
import { AuthorId } from "../value-object/AuthorId";
import { PostContent } from "../value-object/PostContent";
import { PostId } from "../value-object/PostId";
import { PostTitle } from "../value-object/PostTitle";

export class Post extends AggregateRoot {
  readonly id: PostId;
  readonly title: PostTitle;
  readonly content: PostContent;
  readonly authorId: AuthorId;

  constructor(
    id: PostId,
    title: PostTitle,
    content: PostContent,
    authorId: AuthorId
  ) {
    super();
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }
  static create(
    id: PostId,
    title: PostTitle,
    content: PostContent,
    authorId: AuthorId
  ) {
    const newPost = new Post(id, title, content, authorId);

    newPost.record(
      new PostCreatedDomainEvent({
        aggregateId: newPost.id.value,
        title: newPost.title.value,
        content: newPost.content.value,
        authorId: newPost.authorId.value,
      })
    );

    return newPost;
  }

  static fromPrimitives(params: {
    id: string;
    title: string;
    content: string;
    authorId: string;
  }) {
    return new Post(
      new PostId(params.id),
      new PostTitle(params.title),
      new PostContent(params.content),
      new AuthorId(params.authorId)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this.title.value,
      content: this.content.value,
      authorId: this.authorId.value,
    };
  }
}
