import { DataTypes, Model } from "sequelize";

import { sequelizeConnection } from "../../../../../../shared/infrastructure/persistence/sequelize/SequelizeClientPostgresql";

export interface PostUserAttributes {
  id: string;
  username: string;
  posts_count: number;
}

export class PostUserModel extends Model implements PostUserAttributes {
  public id!: string;
  public username!: string;
  public posts_count!: number;
}

PostUserModel.init(
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
    posts_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "posts_count",
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
    timestamps: false,
  }
);
