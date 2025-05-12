import { Post } from "../entity/Post";

export interface IPostRepository {
  save(post: Post): Promise<void>;
}
