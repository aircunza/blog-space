require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

module.exports = {
  development: {
    username: process.env.DB_USER || "dbUser",
    password: process.env.DB_PASSWORD || "dbPassword",
    database: process.env.DB_NAME || "dbName",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    dialect: "postgres",
    logging: false,
  },
};
