import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import request from "supertest";

import { configApps } from "../../../../src/config";
import { seedDeleteUsers } from "../../auth/seeds/login.seed";
import { deletePostsSeed } from "../seeds/deletePosts.seed";
import { AppBackend } from "./../../../../src/apps/app";

describe(" Create post", function () {
  const app = new AppBackend();
  beforeAll(async () => {
    await app.start();
    await deletePostsSeed();
    await seedDeleteUsers();
  });
  // Create user for testing:
  test("should return 201 and a signup message", async () => {
    const res = await request(app.httpServer)
      .post(`${configApps.apiVersionedPath}/auth/signup`)
      .send({
        id: "d009c831-c664-4640-a1fa-b1ffd60ab623",
        username: "test",
        email: "nW6K32@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
  });

  // Create post:
  test(" POST /api/v1/create-post", async function () {
    const res = await request(app.httpServer)
      .post(`${configApps.apiVersionedPath}/create-post`)
      .send({
        id: "d009c831-c664-4640-a1fa-b1ffd60ab628",
        title: "title title title",
        content: "content content content",
        authorId: "d009c831-c664-4640-a1fa-b1ffd60ab623",
      });
    expect(res.statusCode).toBe(201);
  });
  afterAll(async function () {
    await app.stop();
  });
});
