import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import { initAuthUserModel } from "../../../../auth/infrastructure/persistence/sequelize/models/AuthUserModel";
import { initUserModel } from "../../../../users/infrastructure/persistence/sequelize/models/UserModel";

dotenv.config();

export const sequelizeConnection = new Sequelize(
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

initUserModel(sequelizeConnection);
initAuthUserModel(sequelizeConnection);

export async function connectionDb() {
  try {
    await sequelizeConnection.authenticate();
    console.log("Database connection successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
