import { Model } from "sequelize";

import { sequelizeConnection } from "../../../../../shared/infrastructure/persistence/sequelize/SequelizeClientPostgresql";

export class PostModel extends Model {}

PostModel.init(
  {
    id: {
      type: "UUID",
      primaryKey: true,
    },
    title: {
      type: "STRING",
      allowNull: false,
    },
    content: {
      type: "STRING",
      allowNull: false,
    },
    author_id: {
      type: "UUID",
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
