import { FastifyPluginCallback } from "fastify";
import { peopleController } from "./controllers/peopleController";

export const routes: FastifyPluginCallback = (app, opts, next) => {
  app.get("/pessoas/:id", peopleController.findOne);

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
        required: ["nome", "apellido", "nascimento", "stack"],
      },
    },
    handler: peopleController.searchTerm,
  });

  app.get("/contagem-pessoas", peopleController.count);

  next();
};
