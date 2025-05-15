import { PostId } from "../../../Posts/domain/value-object/PostId";
import { IPostsCounterRepository } from "../../domain/IPostsCounterRepository";
import { PostsCounter } from "../../domain/PostsCounter";

export class PostsCounterIncrementer {
  constructor(private repository: IPostsCounterRepository) {}

  async increment(postId: PostId, authorId: string): Promise<void> {
    const counter =
      (await this.repository.search(authorId)) ??
      PostsCounter.initialize(authorId);

    if (counter.hasIncremented(postId)) return;

    counter.increment(postId);
    await this.repository.save(counter);
  }
}
