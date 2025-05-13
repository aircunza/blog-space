import { PostId } from "../../Posts/domain/value-object/PostId";

export class PostsCounter {
  private total: number;
  private existingPosts: Set<string>; // Set to avoid duplicates easily

  constructor(total = 0, existingPosts: Set<string> = new Set()) {
    this.total = total;
    this.existingPosts = existingPosts;
  }

  static initialize(): PostsCounter {
    return new PostsCounter(0, new Set());
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

  toPrimitives(): { total: number; existingPosts: string[] } {
    return {
      total: this.total,
      existingPosts: Array.from(this.existingPosts),
    };
  }

  static fromPrimitives(data: {
    total: number;
    existingPosts: string[];
  }): PostsCounter {
    return new PostsCounter(data.total, new Set(data.existingPosts));
  }
}
