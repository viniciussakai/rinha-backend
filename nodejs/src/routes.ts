import { FastifyPluginCallback } from "fastify";
import { peopleController } from "./controllers/peopleController";

export const routes: FastifyPluginCallback = (app, opts, next) => {
  app.route({
    url: "/pessoas/:id",
    method: "GET",
    schema: {
      params: {
        $id: "id",
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
      },
    },
    handler: peopleController.findOne,
  });

  app.route({
    url: "/pessoas",
    method: "GET",
    schema: {
      querystring: {
        $id: "searchTerm",
        type: "object",
        properties: {
          t: { type: "string" },
        },
        required: ["t"],
      },
    },
    handler: peopleController.searchTerm,
  });

  app.route({
    url: "/pessoas",
    method: "POST",
    schema: {
      body: {
        $id: "createPerson",
        type: "object",
        properties: {
          nome: { type: "string" },
          apelido: { type: "string" },
          nascimento: { type: "string" },
          stack: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["nome", "apelido", "nascimento", "stack"],
      },
    },
    handler: peopleController.create,
  });

  app.get("/contagem-pessoas", peopleController.count);

  next();
};
