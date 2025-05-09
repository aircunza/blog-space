import { AuthorId } from "../value-object/AuthorId";
import { PostContent } from "../value-object/PostContent";
import { PostId } from "../value-object/PostId";
import { PostTitle } from "../value-object/PostTitle";

export class Post {
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
    return new Post(id, title, content, authorId);
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

  static toPrimitives(post: Post) {
    return {
      id: post.id.value,
      title: post.title.value,
      content: post.content.value,
      authorId: post.authorId.value,
    };
  }
}
