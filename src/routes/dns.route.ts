import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { DnsController } from "../controllers/dns.controller";
import { DnsService } from "../services/dns.service";
import { CreateDnsRecordDto } from "../dtos/create-dns.dto";
import { DnsCpanelGateway } from "../gateways/dns.cpanel.gateway";
import { HostVercelGateway } from "../gateways/vercel.gateway";

const dnsGateway = new DnsCpanelGateway()
const hostGateway = new HostVercelGateway()
const dnsService = new DnsService(dnsGateway, hostGateway);
const dnsController = new DnsController(dnsService);

export async function dnsRoutes(server: FastifyInstance) {
  server.post("/", (req: FastifyRequest<{ Body: CreateDnsRecordDto }>, rep) =>
    dnsController.createDnsRecord(req, rep)
  );
}
