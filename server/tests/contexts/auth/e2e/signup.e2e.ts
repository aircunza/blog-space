import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import request from "supertest";

import { AppBackend } from "../../../../src/apps/app";
import { configApps } from "../../../../src/apps/config";
import { seedDeleteUsers } from "../seeds/login.seed";

const app = new AppBackend();

describe("POST /api/v1/auth/signup", () => {
  beforeAll(async function () {
    await app.start();
    await seedDeleteUsers();
  });

  test("should return 422 when id is not a UUID", async () => {
    const res = await request(app.httpServer)
      .post(`${configApps.apiVersionedPath}/auth/signup`)
      .send({
        id: "invalid-id",
        username: "test",
        email: "nW6K32@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(400);
  });

  test("should return 422 when email has an invalid format", async () => {
    const res = await request(app.httpServer)
      .post(`${configApps.apiVersionedPath}/auth/signup`)
      .send({
        id: "d009c831-c664-4640-a1fa-b1ffd60ab623",
        username: "test",
        email: "invalid-email",
        password: "123456",
      });

    expect(res.statusCode).toBe(400);
  });

  test("should return 422 when password is less than 6 characters", async () => {
    const res = await request(app.httpServer)
      .post(`${configApps.apiVersionedPath}/auth/signup`)
      .send({
        id: "d009c831-c664-4640-a1fa-b1ffd60ab623",
        username: "test1",
        email: "nW6K32@example.com",
        password: "12345",
      });

    expect(res.statusCode).toBe(422);
  });

  test("should return 422 when name is more than 29 characters", async () => {
    const res = await request(app.httpServer)
      .post(`${configApps.apiVersionedPath}/auth/signup`)
      .send({
        id: "d009c831-c664-4640-a1fa-b1ffd60ab623",
        username: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
        email: "nW6K32@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(400);
  });

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

  afterAll(async function () {
    await app.stop();
  });
});
