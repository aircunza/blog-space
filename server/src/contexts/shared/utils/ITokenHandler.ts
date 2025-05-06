export interface JWTPayload {
  id: string;
  role: string;
}
export interface ITokenHandler {
  createToken(payload: JWTPayload): Promise<string>;
  verifyToken(token: string): Promise<JWTPayload>;
}
