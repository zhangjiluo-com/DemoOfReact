import { FastifyPluginAsync } from "fastify";
import { TOKEN } from "../config";

const session: FastifyPluginAsync = async (app) => {
  // 添加会话
  app.put("/session", {}, async (request, response) => {
    const req: any = JSON.parse(request.body as any);
    if (req.username === "admin" && req.password === "Aa123456") {
      return {
        token: TOKEN,
      };
    }

    response.status(403);
    return 1001;
  });

  // 获取会话详情
  app.get("/session", {}, async (request, response) => {
    if (request.headers.authorization === TOKEN) {
      return {
        valid: true,
      };
    }
    return {
      valid: false,
    };
  });
};

export default session;
