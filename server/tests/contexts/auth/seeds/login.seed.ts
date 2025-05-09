import { DataTypes, Model } from "sequelize";

import { sequelizeConnection } from "./../../../../src/contexts/shared/infrastructure/persistence/sequelize/SequelizeClientPostgresql";
import { BcryptPasswordEncryptor } from "./../../../../src/contexts/shared/infrastructure/security/BcryptPasswordEncryptor";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      defaultValue: "user",
    },
  },
  {
    sequelize: sequelizeConnection, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
    timestamps: false,
    tableName: "users",
  }
);

export async function seedInsertUsers() {
  try {
    await sequelizeConnection.sync({ force: false });
    const users = await User.findAll();

    const encryptor = new BcryptPasswordEncryptor();

    if (users.length === 0) {
      await User.create({
        id: "d009c831-c664-4640-a1fa-b1ffd60ab601",
        username: "admin",
        email: "admin@example.com",
        password: await encryptor.hash("password123"),
        role: "admin",
      });
      await User.create({
        id: "d009c831-c664-4640-a1fa-b1ffd60ab602",
        username: "user",
        email: "user@example.com",
        password: await encryptor.hash("password123"),
        role: "user",
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function seedDeleteUsers() {
  try {
    await User.destroy({
      where: {},
      truncate: true,
      cascade: true, // ⚠️
    });
  } catch (e) {
    console.error(e);
  }
}
