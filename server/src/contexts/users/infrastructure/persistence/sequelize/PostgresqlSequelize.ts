import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import { initUserModel } from "./models/UserModel";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: false,
  }
);

initUserModel(sequelize);

export async function connectionDb() {
  try {
    await sequelize.authenticate();
    console.log("Database connection successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
