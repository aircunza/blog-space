import { ContainerBuilder, YamlFileLoader } from "node-dependency-injection";

const env = process.env.NODE_ENV;
const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);
loader.load(`${__dirname}/application__${env}.yaml`);

export { container };
import { PostPostgresqlRepository } from "../../../contexts/Post/Posts/infrastructure/persistence/sequelize/repository/PostPostgresqlRepository";
