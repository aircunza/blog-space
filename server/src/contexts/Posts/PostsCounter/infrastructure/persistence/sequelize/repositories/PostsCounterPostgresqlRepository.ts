import { PostsCounter } from "../../../../domain/PostsCounter";
import { PostsCounterModel } from "../models/PostsCounterModel";
import { PostUserModel } from "../models/PostUserModel";
import { IPostsCounterRepository } from "./../../../../domain/IPostsCounterRepository";

export class PostsCounterPostgresqlRepository
  implements IPostsCounterRepository
{
  async save(counter: PostsCounter) {
    await PostsCounterModel.update(
      { posts_count: counter.getTotal() },
      { where: { id: counter.getAuthorId() } }
    );
  }
  async search(authorId: string) {
    const user = await PostUserModel.findByPk(authorId, { raw: true });

    if (!user) return null;
    return new PostsCounter(user.posts_count || 0, new Set(), user.id);
  }
}
