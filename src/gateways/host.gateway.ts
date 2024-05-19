export abstract class HostGateway {
  abstract addDomain(domain: string): Promise<boolean>;
}
