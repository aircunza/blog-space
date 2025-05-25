import { DataTypes, Model, Optional } from "sequelize";

import { sequelizeConnection } from "../../../../../../shared/infrastructure/persistence/sequelize/SequelizeClientPostgresql";

interface PostAttributes {
  id: string;
  title: string;
  content: string;
  author_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PostCreationAttributes
  extends Optional<PostAttributes, "id" | "createdAt" | "updatedAt"> {}

export class PostModel
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  public id!: string;
  public title!: string;
  public content!: string;
  public author_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "posts",
    modelName: "Post",
    timestamps: true,
  }
);
