import Fastify from "fastify";
import { dnsRoutes } from "./routes/dns.route";
import dotenv from 'dotenv';
dotenv.config();

const server = Fastify();

server.register(dnsRoutes, { prefix: "/dns" });

server.get("/", async (request, reply) => {
  console.log(process.env.CPANEL_API_URL);
  
  return "Hello there! 👋";
});

const start = async () => {
  try {
    await server.listen({ port: 8080 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
