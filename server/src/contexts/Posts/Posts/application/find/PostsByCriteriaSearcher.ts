import { Criteria } from "../../../../shared/domain/criteria/Criteria";
import { Filter } from "../../../../shared/domain/criteria/Filter";
import { Order } from "../../../../shared/domain/criteria/Order";
import { IPostRepository } from "../../domain/repository/IPostRepository";

export class PostsByCriteriaSearcher {
  constructor(private readonly repository: IPostRepository) {}

  async run(
    filters: Filter[],
    orderBy: Order[],
    limit?: number,
    cursor?: number
  ) {
    const limitNumber = limit ? Number(limit) : undefined;
    const criteria = new Criteria(filters, orderBy, limitNumber, cursor);

    return await this.repository.searchBy(criteria);
  }
}
