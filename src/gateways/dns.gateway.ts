export abstract class DnsGateway {
  abstract exists(name: string): Promise<boolean>;
  abstract create(name: string): Promise<boolean>;
}
