import { Post } from "../../../../domain/entity/Post";
import { IPostRepository } from "../../../../domain/repository/IPostRepository";
import { PostModel } from "../models/PostModel";

export class PostPostgresqlRepository implements IPostRepository {
  async save(post: Post) {
    await PostModel.create({
      id: post.id.getValue(),
      title: post.title.getValue(),
      content: post.content.getValue(),
      author_id: post.authorId.getValue(),
    });
  }
}
