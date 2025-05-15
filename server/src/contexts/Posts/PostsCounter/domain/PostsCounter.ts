import { PostId } from "../../Posts/domain/value-object/PostId";

export class PostsCounter {
  private total: number;
  private existingPosts: Set<string>; // Set to avoid duplicates easily
  private readonly authorId: string;

  constructor(
    total = 0,
    existingPosts: Set<string> = new Set(),
    authorId: string
  ) {
    this.total = total;
    this.existingPosts = existingPosts;
    this.authorId = authorId;
  }

  static initialize(authorId: string): PostsCounter {
    return new PostsCounter(0, new Set(), authorId);
  }

  increment(postId: PostId): void {
    this.total += 1;
    this.existingPosts.add(postId.value);
  }

  hasIncremented(postId: PostId): boolean {
    return this.existingPosts.has(postId.value);
  }

  getTotal(): number {
    return this.total;
  }

  getAuthorId(): string {
    return this.authorId;
  }

  toPrimitives(): { total: number; existingPosts: string[] } {
    return {
      total: this.total,
      existingPosts: Array.from(this.existingPosts),
    };
  }

  static fromPrimitives(data: {
    total: number;
    existingPosts: string[];
    authorId: string;
  }): PostsCounter {
    return new PostsCounter(
      data.total,
      new Set(data.existingPosts),
      data.authorId
    );
  }
}
