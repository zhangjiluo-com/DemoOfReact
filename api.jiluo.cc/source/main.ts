import fastify from "fastify";
import sequelize from "./plugins/sequelize";
import routes from "./routes";

const app = fastify();

const host =
  process.env.NODE_ENV === "development" ? "124.223.215.24" : "124.223.215.24";

const setup = async () => {
  await sequelize(app, {
    dialect: "mysql",
    username: "root",
    password: "Aa123567",
    database: "cms_dev",
    host,
    port: 2543,
    sync: {
      alter: true,
    },
  });

  app.register(routes);

  app.listen({
    port: 2542,
    host: "0.0.0.0",
  });
  console.log("http://localhost:2542");
};

setup();
