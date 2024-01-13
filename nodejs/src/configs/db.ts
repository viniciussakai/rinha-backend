const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_MAX_CONNECTION,
  DB_TIMEOUT,
  DB_IDLE,
} = process.env;

export const dbConfig = {
  host: DB_HOST || "localhost",
  database: DB_NAME || "postgres",
  user: DB_USER || "postgres",
  password: DB_PASSWORD || "root",
  port: Number(DB_PORT) || 5432,
  max: Number(DB_MAX_CONNECTION) || 20,
  idleTimeoutMillis: Number(DB_TIMEOUT) || 30000,
  connectionTimeoutMillis: Number(DB_IDLE) || 2000,
};
