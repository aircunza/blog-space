import { PostsCounter } from "./PostsCounter";

export interface PostsCounterRepository {
  save: (postsCounter: PostsCounter) => Promise<void>;
  search: () => Promise<PostsCounter | null>;
}
