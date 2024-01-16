import { Pool } from "pg";
import { dbConfig } from "../configs/db";

const pool = new Pool(dbConfig);

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

class People {
  public async create(data: any) {
    const query =
      "INSERT INTO pessoas (id, nome, nascimento, apelido, stack) VALUES ($1, $2, $3, $4, $5)";
    const values = [
      data.id,
      data.nome,
      data.nascimento,
      data.apelido,
      data.stack,
    ];

    await pool.query(query, values);
  }

  public async findOne(id: string) {
    const query = "SELECT * FROM pessoas WHERE id = $1";
    const values = [id];
    const result = await pool.query(query, values);

    return result.rows[0];
  }

  public async searchTerm(term: string) {
    const query = "SELECT * FROM pessoas WHERE searchable ILIKE $1 LIMIT 50";
    const values = [`%${term}%`];
    const result = await pool.query(query, values);

    return result.rows;
  }

  public async count() {
    const query = "SELECT COUNT(*) FROM pessoas";
    const result = await pool.query(query);

    return result.rows[0].count;
  }

  public async nicknameExists(apelido: string) {
    const query = "SELECT * FROM pessoas WHERE apelido = $1";
    const values = [apelido];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      return true;
    }
  }
}

export const PeopleRepository = new People();
