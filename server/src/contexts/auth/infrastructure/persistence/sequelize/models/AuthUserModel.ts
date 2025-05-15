import { DataTypes, Model, Sequelize } from "sequelize";

export class AuthUserModel extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}
export const initAuthUserModel = (sequelize: Sequelize) => {
  AuthUserModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "user",
      },
      posts_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "AuthUser",
      tableName: "users",
      timestamps: false,
    }
  );
};
