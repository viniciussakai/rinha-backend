import "dotenv/config";
import fastify from "fastify";
import { PostgresPool } from "./database/db";
import { routes } from "./routes";

const server = fastify();
const PORT = 3000 || process.env.PORT;
const database = PostgresPool.geInstance();

database.init();

server.register(routes, {});

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`[server] listening on ${address}`);
  console.log(server.printRoutes());
});
