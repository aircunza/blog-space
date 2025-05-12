import { PostModel } from "../../../../src/contexts/Posts/Posts/infrastructure/persistence/sequelize/models/PostModel";

export async function deletePostsSeed() {
  try {
    await PostModel.destroy({ truncate: true });
  } catch (e) {
    console.error(e);
  }
}
