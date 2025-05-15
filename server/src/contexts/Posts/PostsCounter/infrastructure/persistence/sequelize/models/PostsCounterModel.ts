import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "src/contexts/shared/infrastructure/persistence/sequelize/SequelizeClientPostgresql";

export class PostsCounterModel extends Model {}

PostsCounterModel.init(
  {
    post_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
  }
);
