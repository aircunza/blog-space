import { PostId } from "../../../Posts/domain/value-object/PostId";
import { PostsCounter } from "../../domain/PostsCounter";
import { PostsCounterRepository } from "../../domain/PostsCounterRepository";

export class PostsCounterIncrementer {
  constructor(private repository: PostsCounterRepository) {}

  async increment(postId: PostId): Promise<void> {
    const counter =
      (await this.repository.search()) ?? PostsCounter.initialize();

    if (counter.hasIncremented(postId)) return;

    counter.increment(postId);
    await this.repository.save(counter);
  }
}
