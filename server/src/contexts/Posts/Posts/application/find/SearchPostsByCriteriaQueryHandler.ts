import { Order } from "../../../../shared/domain/criteria/Order";
import { IQueryHandler } from "../../../../shared/domain/query/IQueryHandler";
import { Post } from "../../domain/entity/Post";
import { PostsByCriteriaSearcher } from "./PostsByCriteriaSearcher";
import { SearchPostsByCriteriaQuery } from "./SearchPostsByCriteriaQuery";

export class SearchPostsByCriteriaQueryHandler
  implements IQueryHandler<SearchPostsByCriteriaQuery, Post[]>
{
  constructor(private readonly searcher: PostsByCriteriaSearcher) {}

  subscribedTo() {
    return SearchPostsByCriteriaQuery;
  }

  async handle(query: SearchPostsByCriteriaQuery): Promise<Post[]> {
    const order = query.orderBy
      ? [Order.fromPrimitives(query.orderBy, query.orderType)]
      : [];

    return await this.searcher.run(
      query.filters,
      order,
      query.limit,
      query.cursor
    );
  }
}
