import { DnsGateway } from "../gateways/dns.gateway";
import { HostGateway } from "../gateways/host.gateway";

export class DnsService {
  private dnsGateway: DnsGateway;
  private hostGateway: HostGateway;

  constructor(dnsGateway: DnsGateway, hostGateway: HostGateway) {
    this.dnsGateway = dnsGateway;
    this.hostGateway = hostGateway;
  }

  async createDnsRecord(slug: string) {
    console.log(slug);
    const exists = await this.dnsGateway.exists(slug);
    if (exists) {
      throw new Error("Este nome já existe");
    }

    const response = await this.dnsGateway.create(slug);
    console.log({ response });

    if (response) {
      await this.hostGateway.addDomain(`${slug}.${process.env.APP_BASE_URL}`)
      return { domain: `https://${slug}.${process.env.APP_BASE_URL}` };
    }
    return response;
  }
}
