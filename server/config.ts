import dotenv from "dotenv";

type EnvType = "dev" | "test" | "prod";

const nodeEnv = (process.env.NODE_ENV as EnvType) || "dev";

const envFileMap: Record<EnvType, string> = {
  dev: ".env.dev",
  test: ".env.test",
  prod: ".env",
};

dotenv.config({ path: envFileMap[nodeEnv] });

const urlClients = Object.keys(process.env)
  .filter((key) => key.startsWith("URL_CLIENT") && process.env[key])
  .sort()
  .map((key) => process.env[key] as string);

export const configApps = {
  dbName: process.env.DB_NAME || "dbName",
  dbUser: process.env.DB_USER || "dbUser",
  dbPassword: process.env.DB_PASSWORD || "dbPassword",
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: process.env.DB_PORT || "5432",
  port: process.env.PORT_API || "3000",
  jwtSecret: process.env.JWT_SECRET || "secret",
  urlClients: urlClients.length > 0 ? urlClients : ["http://localhost:5173", "http://localhost:4173"],
  apiVersionedPath: process.env.API_VERSIONED_PATH || "/api/v1",
};
