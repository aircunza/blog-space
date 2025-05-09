import { Post } from "../../domain/entity/Post";
import { IPostRepository } from "../../domain/repository/IPostRepository";
import { AuthorId } from "../../domain/value-object/AuthorId";
import { PostContent } from "../../domain/value-object/PostContent";
import { PostId } from "../../domain/value-object/PostId";
import { PostTitle } from "../../domain/value-object/PostTitle";

export class PostCreator {
  constructor(private readonly postRepository: IPostRepository) {}
  async run(params: {
    id: PostId;
    title: PostTitle;
    content: PostContent;
    authorId: AuthorId;
  }) {
    const post = Post.create(
      params.id,
      params.title,
      params.content,
      params.authorId
    );
    await this.postRepository.save(post);
  }
}
