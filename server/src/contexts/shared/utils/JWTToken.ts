import jwt from "jsonwebtoken";

import { configApps } from "../../../config";
import { ITokenHandler, JWTPayload } from "./ITokenHandler";

const privateKey = configApps.jwtSecret;

async function create(payload: JWTPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, { expiresIn: "1h" }, function (err, token) {
      if (err || token === undefined) {
        console.error(err);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}
async function verify(token: string): Promise<JWTPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, function (err, decoded) {
      if (err || decoded === undefined) {
        console.error(err);
        reject(err);
      } else {
        resolve(decoded as JWTPayload);
      }
    });
  });
}

export class JWTToken implements ITokenHandler {
  async createToken(payload: JWTPayload): Promise<string> {
    return await create(payload);
  }

  async verifyToken(token: string): Promise<JWTPayload> {
    return await verify(token);
  }
}
