import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import request from "supertest";
import { v4 as uuidv4 } from "uuid";

import { configApps } from "../../../../src/config";
import { Post } from "../../../../src/contexts/Posts/Posts/domain/entity/Post";
import { AuthorId } from "../../../../src/contexts/Posts/Posts/domain/value-object/AuthorId";
import { PostContent } from "../../../../src/contexts/Posts/Posts/domain/value-object/PostContent";
import { PostId } from "../../../../src/contexts/Posts/Posts/domain/value-object/PostId";
import { PostTitle } from "../../../../src/contexts/Posts/Posts/domain/value-object/PostTitle";
import { PostPostgresqlRepository } from "../../../../src/contexts/Posts/Posts/infrastructure/persistence/sequelize/repository/PostPostgresqlRepository";
import { seedDeleteUsers } from "../../auth/seeds/login.seed";
import { deletePostsSeed } from "../seeds/deletePosts.seed";
import { AppBackend } from "./../../../../src/apps/app";

describe("GET /get-posts-by", () => {
  const app = new AppBackend();
  const baseUrl = `${configApps.apiVersionedPath}/get-posts-by`;
  const authorId = "d009c831-c664-4640-a1fa-b1ffd60ab623";
  const repository = new PostPostgresqlRepository();

  beforeAll(async () => {
    await app.start();
    await deletePostsSeed();
    await seedDeleteUsers();

    // Create test user
    await request(app.httpServer)
      .post(`${configApps.apiVersionedPath}/auth/signup`)
      .send({
        id: authorId,
        username: "test",
        email: "e2etest@example.com",
        password: "123456",
      });

    // Create posts directly via repository with valid UUIDs
    await Promise.all(
      [1, 2, 3].map((i) => {
        const post = new Post(
          new PostId(uuidv4()), // UUID válido generado dinámicamente
          new PostTitle(`title-${i}`),
          new PostContent(`content-${i}`),
          new AuthorId(authorId)
        );
        return repository.save(post);
      })
    );
  });

  test("should return posts with no filters", async () => {
    const res = await request(app.httpServer).get(baseUrl);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("should filter posts by title", async () => {
    const res = await request(app.httpServer)
      .get(baseUrl)
      .query({ field: "title", operator: "=", value: "title-1" });

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title.value).toBe("title-1");
  });

  test("should filter posts by authorId", async () => {
    const res = await request(app.httpServer).get(baseUrl).query({
      field: "author_id",
      operator: "=",
      value: authorId,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.every((p: Post) => p.authorId.value === authorId)).toBe(
      true
    );
  });

  test("should paginate using cursor", async () => {
    const res1 = await request(app.httpServer).get(baseUrl).query({ limit: 2 });
    const firstPage = res1.body;

    const lastCursor = firstPage[firstPage.length - 1].createdAt;

    const res2 = await request(app.httpServer)
      .get(baseUrl)
      .query({ limit: 2, cursor: lastCursor });

    expect(res2.statusCode).toBe(200);
    expect(res2.body.length).toBeGreaterThanOrEqual(0);
  });

  test("should return posts in descending order", async () => {
    type PostResponse = ReturnType<Post["toPrimitives"]>;

    const res = await request(app.httpServer).get(baseUrl).query({
      orderBy: "created_at",
      orderType: "desc",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(1);

    const timestamps = res.body.map((p: PostResponse) =>
      new Date(p.createdAt!).getTime()
    );
    const sorted = [...timestamps].sort((a, b) => b - a);
    expect(timestamps).toEqual(sorted);
  });

  afterAll(async () => {
    await app.stop();
  });
});
