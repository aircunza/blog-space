import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import request from "supertest";

import { AppBackend } from "../../../../src/apps/app";
import { configApps } from "../../../../src/config";
import { PostUserModel } from "../../../../src/contexts/Posts/PostsCounter/infrastructure/persistence/sequelize/models/PostUserModel";
import { seedDeleteUsers } from "../../auth/seeds/login.seed";
import { deletePostsSeed } from "../seeds/deletePosts.seed";

describe("Posts counter", () => {
  const app = new AppBackend();
  const userId = "d009c831-c664-4640-a1fa-b1ffd60ab623";

  beforeAll(async () => {
    await app.start();
    await deletePostsSeed();
    await seedDeleteUsers();

    // Create user before testing posts
    await request(app.httpServer)
      .post(`${configApps.apiVersionedPath}/auth/signup`)
      .send({
        id: userId,
        username: "test",
        email: "counter@example.com",
        password: "123456",
      });
  });

  test("should increment posts_count correctly and remain idempotent", async () => {
    // Create first post
    const firstPost = await request(app.httpServer)
      .post(`${configApps.apiVersionedPath}/create-post`)
      .send({
        id: "d009c831-c664-4640-a1fa-b1ffd60ab628",
        title: "First post",
        content: "Some content",
        authorId: userId,
      });

    expect(firstPost.statusCode).toBe(201);

    // Wait for domain event to be processed
    await new Promise<void>((res) => {
      setTimeout(res, 500);
    });

    // Create second post
    const secondPost = await request(app.httpServer)
      .post(`${configApps.apiVersionedPath}/create-post`)
      .send({
        id: "d009c831-c664-4640-a1fa-b1ffd60ab629",
        title: "Second post",
        content: "More content",
        authorId: userId,
      });

    expect(secondPost.statusCode).toBe(201);

    // Wait again for event to propagate

    await new Promise<void>((res) => {
      setTimeout(res, 500);
    });

    // Try to create a duplicate post (same ID as first one)
    await request(app.httpServer)
      .post(`${configApps.apiVersionedPath}/create-post`)
      .send({
        id: "d009c831-c664-4640-a1fa-b1ffd60ab628", // same as first post
        title: "Duplicate post",
        content: "Should not increment",
        authorId: userId,
      });

    // Allow failure or duplicate rejection logic; just ensure no increment
    // Wait again in case event is triggered
    await new Promise<void>((res) => {
      setTimeout(res, 500);
    });

    // Fetch user from DB and check final count
    const userInDb = await PostUserModel.findByPk(userId, { raw: true });

    // Should be exactly 2 posts, not 3
    expect(userInDb?.posts_count).toBe(2);
  });

  afterAll(async () => {
    await app.stop();
  });
});
