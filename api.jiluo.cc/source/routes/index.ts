import { type FastifyPluginAsync } from "fastify";
import articles from "./articles";
import session from "./session";
import { TOKEN } from "../config";

const root: FastifyPluginAsync = async (app) => {
  app.get("/", {}, (request, response) => {
    return "不可用";
  });

  app.options("*", async (request, response) => {
    response.headers({
      "Access-Control-Allow-Origin": request.headers.origin,
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
      "Access-Control-Allow-Headers": "Authorization,Content-Type",
    });
    return null;
  });

  app.addHook("onRequest", async (request, response) => {
    if (
      !request.routerPath.startsWith("/session") &&
      ["POST", "PUT", "PATCH", "DELETE"].includes(request.method) &&
      request.headers.authorization !== TOKEN
    ) {
      response.status(401);
      response.send();
    }
  });

  app.addHook("onSend", async (request, response) => {
    response.headers({
      "Access-Control-Allow-Origin": request.headers.origin,
    });
  });

  app.register(session);
  app.register(articles);
};

export default root;
