import { PostsCounter } from "./PostsCounter";

export interface IPostsCounterRepository {
  save: (postsCounter: PostsCounter) => Promise<void>;
  search: (authorId: string) => Promise<PostsCounter | null>;
}
