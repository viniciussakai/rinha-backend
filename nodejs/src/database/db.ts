import { dbConfig } from "@/configs/db";
import { Pool } from "pg";

export class PostgressPool {
  private _pool: Pool;
  private static instance: PostgressPool;

  private constructor() {
    this._pool = new Pool({
      ...dbConfig,
    });

    this._pool.on("connect", this.onConnect);
    this._pool.on("error", this.onError);
    this._pool.on("remove", this.onClose);
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

  public static geInstance(): PostgressPool {
    if (!this.instance) {
      this.instance = new PostgressPool();
    }
    return this.instance;
  }

  public query(query: string, params?: any[]) {
    return this._pool.query(query, params);
  }
}
