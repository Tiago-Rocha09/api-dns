export abstract class dnsGateway {
  abstract exists(name: string): Promise<boolean>;
  abstract create(name: string): Promise<boolean>;
}
