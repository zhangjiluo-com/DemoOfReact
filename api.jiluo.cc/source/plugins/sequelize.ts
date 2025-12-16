import { type FastifyPluginAsync } from "fastify";
import { Sequelize, DataTypes, Options } from "sequelize";

const sequelizePlugin: FastifyPluginAsync = async (app, options: Options) => {
  console.log("sequelize 插件执行了");
  const instance = "sequelize";

  const sequelize = new Sequelize(options);

  sequelize.define(
    "article",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      modelName: "articles",
    }
  );

  await sequelize.sync();

  await sequelize.authenticate();

  app.decorate(instance, sequelize);
  app.addHook("onClose", (fastifyInstance, done) => {
    sequelize.close().finally(done);
  });
};

export default sequelizePlugin;

declare module "fastify" {
  export interface FastifyInstance {
    sequelize: Sequelize;
  }
}
