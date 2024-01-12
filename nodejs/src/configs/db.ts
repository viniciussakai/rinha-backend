const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  PG_PORT,
  MAX_CONNECTION,
  PG_TIMEOUT,
  PG_IDLE,
} = process.env;

export const dbConfig = {
  host: POSTGRES_HOST || "localhost",
  database: POSTGRES_DB || "postgres",
  user: POSTGRES_USER || "postgres",
  password: POSTGRES_PASSWORD || "root",
  port: Number(PG_PORT) || 5432,
  max: Number(MAX_CONNECTION) || 20,
  idleTimeoutMillis: Number(PG_TIMEOUT) || 30000,
  connectionTimeoutMillis: Number(PG_IDLE) || 2000,
};
