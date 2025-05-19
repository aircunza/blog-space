import { DataTypes, Model } from "sequelize";

import { sequelizeConnection } from "../../../../../../../contexts/shared/infrastructure/persistence/sequelize/SequelizeClientPostgresql";

export class PostsCounterModel extends Model {}

PostsCounterModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    posts_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
  }
);
