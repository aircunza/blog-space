import { Criteria } from "../../../../shared/domain/criteria/Criteria";
import { Post } from "../entity/Post";

export interface IPostRepository {
  save(post: Post): Promise<void>;
  searchBy(criteria: Criteria): Promise<Post[]>;
}
