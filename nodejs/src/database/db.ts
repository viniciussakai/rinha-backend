import fs from "fs";
import { Pool } from "pg";
import { dbConfig } from "../configs/db";

const schema = fs.readFileSync("src/database/schema.sql", "utf8");

export class PostgresPool {
  private _pool: Pool;
  private static instance: PostgresPool;

  private constructor() {
    this._pool = new Pool({
      ...dbConfig,
    });

    this._pool.on("connect", this.onConnect);
    this._pool.on("error", this.onError);
    this._pool.on("remove", this.onClose);
  }

  public async init() {
    try {
      await this._pool.query(schema);
      console.log("Schema has been created");
    } catch (err) {
      console.error("Error while creating schema", err);
    }
  }

  private onConnect() {
    console.log("A new connection has been made.");
  }

  private onError(err: Error) {
    console.error("An error occurred while connecting to the DB", err);
  }

  private onClose() {
    console.log("Database connection has been closed.");
  }

  public static geInstance(): PostgresPool {
    if (!this.instance) {
      this.instance = new PostgresPool();
    }
    return this.instance;
  }

  public query(query: string, params?: any[]) {
    return this._pool.query(query, params);
  }
}
