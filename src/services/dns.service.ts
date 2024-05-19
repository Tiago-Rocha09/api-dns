import { dnsGateway } from "../gateways/dns.gateway";

export class DnsService {
  private dnsGateway: dnsGateway;

  constructor(dnsGateway: dnsGateway) {
    this.dnsGateway = dnsGateway;
  }

  async createDnsRecord(slug: string) {
    console.log(slug);
    const exists = await this.dnsGateway.exists(slug);
    if (exists) {
      throw new Error("Este nome já existe");
    }

    const response = await this.dnsGateway.create(slug);
    console.log({ response });

    return response;
  }
}
