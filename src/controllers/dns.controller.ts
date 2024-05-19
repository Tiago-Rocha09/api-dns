import { FastifyReply, FastifyRequest } from "fastify";
import { CreateDnsRecordDto } from "../dtos/create-dns.dto";
import { DnsService } from "../services/dns.service";

export class DnsController {
  private dnsService: DnsService;

  constructor(dnsService: DnsService) {
    this.dnsService = dnsService;
  }

  async createDnsRecord(
    req: FastifyRequest<{ Body: CreateDnsRecordDto }>,
    rep: FastifyReply
  ) {
    try {
      const { slug } = req.body;
      const response = await this.dnsService.createDnsRecord(slug);
      return response;
    } catch (error) {
      console.log({ error });
      if (error instanceof Error) {
        return rep
          .status(400)
          .send({ message: error.message || "Erro ao criar a conta" });
      }
      return rep.status(400).send({ message: "Erro ao criar a conta" });
    }
  }
}
