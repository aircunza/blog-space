import { QueryTypes } from "sequelize";

import { Criteria } from "../../../../../../shared/domain/criteria/Criteria";
import { sequelizeConnection } from "../../../../../../shared/infrastructure/persistence/sequelize/SequelizeClientPostgresql";
import { Post } from "../../../../domain/entity/Post";
import { IPostRepository } from "../../../../domain/repository/IPostRepository";
import { PostModel } from "../models/PostModel";

export class PostPostgresqlRepository implements IPostRepository {
  // Save a Post entity into the database using the Sequelize model
  async save(post: Post) {
    await PostModel.create({
      id: post.id.getValue(),
      title: post.title.getValue(),
      content: post.content.getValue(),
      author_id: post.authorId.getValue(),
    });
  }

  // Search posts by a set of criteria that includes filters, ordering, pagination, and cursor
  async searchBy(criteria: Criteria): Promise<Post[]> {
    // Default limit to 10 if not provided
    const limit = criteria.limit ?? 10;

    // Get the first order criteria or use default order by created_at ascending
    const order = criteria.orders[0] ?? { by: "created_at", direction: "asc" };
    const orderBy = order.by;
    // Convert order direction to uppercase (ASC or DESC)
    const direction = order.direction.toUpperCase();

    // Map filters into SQL WHERE clause parts with parameterized replacements to prevent SQL injection
    const filters = criteria.filters.map((f, i) => {
      const key = `filter_${i}`; // Unique key for query replacement
      return {
        clause: `${f.field} ${f.operator.value} :${key}`, // e.g. "title = :filter_0"
        replacementKey: key,
        value: f.value,
      };
    });

    // Extract only the SQL clauses for WHERE
    const whereClauseParts = filters.map((f) => f.clause);

    // Create an object with keys and values for parameter replacements
    const replacements: Record<string, any> = Object.fromEntries(
      filters.map((f) => [f.replacementKey, f.value])
    );

    // If a cursor is provided, add a filter for pagination based on order direction
    if (criteria.cursor) {
      whereClauseParts.push(
        direction === "ASC" ? `${orderBy} > :cursor` : `${orderBy} < :cursor`
      );
      replacements.cursor = criteria.cursor;
    }

    // Base SQL SELECT query with alias for created_at as createdAt (for convenience)
    let query = `
      SELECT
        id,
        title,
        content,
        author_id,
        created_at AS "createdAt"
      FROM posts
    `;

    // Add WHERE clause if there are any filters
    if (whereClauseParts.length > 0) {
      query += ` WHERE ${whereClauseParts.join(" AND ")}`;
    }

    // Add ORDER BY clause
    query += ` ORDER BY ${orderBy} ${direction}`;

    // Add pagination:
    // If cursor-based pagination, limit results to limit + 1 to detect if there's a next page
    // Otherwise use simple limit + offset pagination
    if (criteria.cursor) {
      query += " LIMIT :limit_plus_one";
      replacements.limit_plus_one = limit + 1;
    } else {
      query += " LIMIT :limit OFFSET :offset";
      replacements.limit = limit;
      replacements.offset = 0;
    }

    // Execute the raw SQL query using sequelize with the replacements for parameters
    const results = await sequelizeConnection.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });

    // Map each result row into a Post domain entity using a factory method fromPrimitives
    return (results as any[]).map((row) =>
      Post.fromPrimitives({
        id: row.id,
        title: row.title,
        content: row.content,
        authorId: row.author_id,
      })
    );
  }
}
