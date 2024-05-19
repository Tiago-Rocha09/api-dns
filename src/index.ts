import Fastify from "fastify";
//@ts-ignore
import fastifyCors from "fastify-cors";
import dotenv from "dotenv";
import { dnsRoutes } from "./routes/dns.route";
dotenv.config();

const server = Fastify();

server.register(fastifyCors, {
  origin: true,
});

server.register(dnsRoutes, { prefix: "/dns" });
server.get("/", async (request, reply) => {
  console.log(process.env.CPANEL_API_URL);

  return "Hello there! 👋";
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 8080;
    console.log({ port, host: "0.0.0.0" });
    await server.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
