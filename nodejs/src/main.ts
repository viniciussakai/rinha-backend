import "dotenv/config";
import fastify from "fastify";

const server = fastify();
const PORT = 3000 || process.env.PORT;

server.get("/", async (request, reply) => {
  return { hello: "world" };
});

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`[server] listening on ${address}`);
});
