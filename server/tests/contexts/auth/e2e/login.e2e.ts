import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import request from "supertest";

import { AppBackend } from "../../../../src/apps/app";
import { seedDeleteUsers, seedInsertUsers } from "../seeds/login.seed";

describe(" POST /api/v1/auth/login", function () {
  const app = new AppBackend();
  beforeAll(async function () {
    await app.start();
    await seedDeleteUsers();
    await seedInsertUsers();
  });
  test("Should return status 200", async function () {
    const res = await request(app.httpServer).post("/api/v1/auth/login").send({
      email: "user@example.com",
      password: "password123",
    });
    console.log("ddddd0----------------");
    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBeTruthy();

    // Verify that the cookie has been set correctly
    expect(res.headers["set-cookie"]).toBeDefined();
    const cookie = res.headers["set-cookie"][0];
    expect(cookie).toContain("authToken=");
    expect(cookie).toContain("HttpOnly");

    const authToken = cookie.split("=")[1];
    expect(authToken).toBeDefined();
  });

  test("Should return 401 when password is incorrect", async () => {
    const res = await request(app.httpServer).post("/api/v1/auth/login").send({
      email: "nW6K3@example.com",
      password: "incorrect-password",
    });
    expect(res.body).toBeDefined();
    expect(res.statusCode).toBe(401);
  });

  test("Should return 404 when email is incorrect", async () => {
    const res = await request(app.httpServer).post("/api/v1/auth/login").send({
      email: "non-existent-email@example.com",
      password: "123456",
    });
    expect(res.body).toBeDefined();
    expect(res.statusCode).toBe(401);
  });
  afterAll(async function () {
    // await seedDeleteUsers();
    await app.stop();
  });
});
