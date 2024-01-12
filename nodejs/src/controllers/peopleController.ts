import { FastifyReply, FastifyRequest } from "fastify";

class PeopleController {
  public create = async (req: FastifyRequest, reply: FastifyReply) => {
    return reply.status(201);
  };

  public findOne = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as any;

    return reply.status(200).send({ id });
  };

  public searchTerm = async (req: FastifyRequest, reply: FastifyReply) => {
    const { t } = req.query as any;

    return reply.status(200).send({});
  };

  public count = async (req: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200);
  };
}

export const peopleController = new PeopleController();
