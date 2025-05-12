import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import request from "supertest";

import { AppBackend } from "../../../../../src/apps/app";

const app = new AppBackend();

describe("GET /api/users/ping", () => {
  beforeAll(async function () {
    await app.start();
  });

  test("should return 200 and a ping message", async () => {
    const res = await request(app.httpServer).get("/api/v1/users/create-user");

    expect(res.statusCode).toBe(201);
    //expect(res.body).toEqual({ message: "User controller is working" });
  });

  afterAll(async function () {
    await app.stop();
  });
});
