import "dotenv/config";
import fastify from "fastify";
import { PostgresPool } from "./database/db";
import { routes } from "./routes";

const server = fastify();
const PORT = Number(process.env.APP_PORT) || 3000;
const database = PostgresPool.geInstance();

database.init();

server.register(routes, {});

server.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`[server] listening on ${address}`);
  console.log(server.printRoutes());
});
