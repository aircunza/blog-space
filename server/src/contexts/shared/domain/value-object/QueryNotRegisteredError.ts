import { Query } from "../query/Query";
import { DomainError } from "./DomainError";

export class QueryNotRegisteredError extends DomainError {
  constructor(query: Query) {
    super(
      `The query <${query.constructor.name}> hasn't a query handler associated`,
      new.target.name
    );
  }
}
