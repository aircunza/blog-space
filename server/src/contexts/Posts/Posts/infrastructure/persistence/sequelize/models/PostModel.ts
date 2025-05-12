import { DataTypes, Model } from "sequelize";

import { sequelizeConnection } from "../../../../../../shared/infrastructure/persistence/sequelize/SequelizeClientPostgresql";

export class PostModel extends Model {}

PostModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    timestamps: true,
    createdAt: false,
    updatedAt: "updated_at",
    tableName: "posts",
    modelName: "Post",
  }
);
