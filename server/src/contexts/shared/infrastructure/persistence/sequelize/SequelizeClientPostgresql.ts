import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import { configApps } from "../../../../../config";
import { initAuthUserModel } from "../../../../auth/infrastructure/persistence/sequelize/models/AuthUserModel";
import { initUserModel } from "../../../../users/infrastructure/persistence/sequelize/models/UserModel";

dotenv.config();

export const sequelizeConnection = new Sequelize(
  configApps.dbName as string,
  configApps.dbUser as string,
  configApps.dbPassword as string,
  {
    host: configApps.dbHost,
    port: Number(configApps.dbPort),
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
