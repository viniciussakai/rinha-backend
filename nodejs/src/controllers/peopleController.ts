import { FastifyReply, FastifyRequest } from "fastify";
import { PostgresPool } from "../database/db";

class PeopleController {
  public create = async (req: FastifyRequest, reply: FastifyReply) => {
    const { nome, apelido, nascimento, stack = [] } = req.body as any;

    if (!nome || !apelido || !nascimento) {
      return reply.status(422).send({ error: "Missing fields" });
    }

    const date = new Date(nascimento);

    if (date.toString() === "Invalid Date") {
      return reply.status(422).send({ error: "Invalid date" });
    }

    const pool = PostgresPool.geInstance();

    try {
      const { rows } = await pool.query(
        "SELECT * FROM pessoas WHERE apelido = $1",
        [apelido]
      );

      if (rows.length > 0) {
        return reply.status(422).send({ error: "User already exists" });
      }
    } catch (err) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }

    try {
      await pool.query(
        "INSERT INTO pessoas (nome, apelido, nascimento, stack) VALUES ($1, $2, $3, $4)",
        [nome, apelido, date, JSON.stringify(stack)]
      );
    } catch (err) {
      return reply.status(500).send({ error: "Internal Server Error" });
    }

    return reply.status(201).send({ mensage: "User created" });
  };

  public findOne = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as any;
    const pool = PostgresPool.geInstance();

    if (!id) {
      return reply.status(400).send({ error: "Missing id" });
    }

    try {
      const { rows } = await pool.query("SELECT * FROM pessoas WHERE id = $1", [
        id,
      ]);

      if (rows.length === 0) {
        return reply.status(404).send({ error: "User not found" });
      }

      return reply.status(200).send({
        id: rows[0].id,
        nome: rows[0].nome,
        apelido: rows[0].apelido,
        nascimento: rows[0].nascimento,
      });
    } catch {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  };

  public searchTerm = async (req: FastifyRequest, reply: FastifyReply) => {
    const { t } = req.query as any;

    if (!t) {
      return reply.status(422).send({ error: "Missing search term" });
    }

    const pool = PostgresPool.geInstance();
    try {
      const { rows } = await pool.query(
        "SELECT * FROM pessoas WHERE searchable ilike $1",
        [`%${t}%`]
      );

      return reply.status(200).send(rows);
    } catch (err) {
      console.log(err);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  };

  public count = async (req: FastifyRequest, reply: FastifyReply) => {
    const pool = PostgresPool.geInstance();

    try {
      const count = await pool.query("SELECT COUNT(*) FROM pessoas");
      return reply.status(200).send({ count: count.rows[0].count });
    } catch {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  };
}

export const peopleController = new PeopleController();
