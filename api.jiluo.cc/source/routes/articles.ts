import { FastifyPluginAsync } from "fastify";

const articles: FastifyPluginAsync = async (app) => {
  // 获取文章列表
  app.get("/articles", {}, async (request, response) => {
    return app.sequelize.models.article.findAll();
  });

  // 获取文章详情
  app.get("/articles/:id", {}, async (request, response) => {
    const id = Number((request.params as any).id);
    const article = await app.sequelize.models.article.findOne({
      where: {
        id,
      },
    });
    return article;
  });

  // 添加文章
  app.put("/articles", {}, async (request, response) => {
    const req: any = JSON.parse(request.body as any);
    const article = await app.sequelize.models.article.create({
      title: req.title,
      cover: req.cover,
      summary: req.summary,
      content: req.content,
    });

    await article.save();
  });

  // 修改文章
  app.patch("/articles/:id", {}, async (request) => {
    const id = Number((request.params as any).id);
    const req: any = JSON.parse(request.body as any);

    await app.sequelize.models.article.update(
      {
        title: req.title,
        cover: req.cover,
        summary: req.summary,
        content: req.content,
      },
      {
        where: {
          id,
        },
      }
    );
  });

  // 删除文章
  app.delete("/articles/:id", {}, async (request) => {
    const id = Number((request.params as any).id);
    const result: any = await app.sequelize.models.article.destroy({
      where: {
        id,
      },
    });
    return result;
  });
};

export default articles;
