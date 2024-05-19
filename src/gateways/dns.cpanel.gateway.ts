import axios from "axios";
import { DnsGateway } from "./dns.gateway";
import { CpanelDnsRecord } from "./types/cpanel-dns-record.type";

export class DnsCpanelGateway implements DnsGateway {
  async exists(name: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `${process.env.CPANEL_API_URL}/execute/DNS/lookup`,
        {
          params: {
            domain: `${name}.${process.env.APP_BASE_URL}`,
          },
          headers: {
            Authorization: `cpanel ${process.env.CPANEL_USER}:${process.env.CPANEL_API_KEY}`,
          },
        }
      );
      console.log({ response });

      if (response.status !== 200) return false;

      const { data } = response;
      return !!data.status;
    } catch (error) {
      console.log({ error });

      return false;
    }
  }
  async getSerialNumber(): Promise<number | boolean> {
    try {
      const response = await axios.get(
        `${process.env.CPANEL_API_URL}/execute/DNS/parse_zone`,
        {
          params: {
            zone: process.env.APP_BASE_URL,
          },
          headers: {
            Authorization: `cpanel ${process.env.CPANEL_USER}:${process.env.CPANEL_API_KEY}`,
          },
        }
      );

      if (response.status !== 200) return false;

      const { data } = response;
      console.log({ data });
      const dataArray = data.data;

      // The current serial number in the DNS zone’s SOA (Start of Authority) record.
      // If this value does not match the zone’s current state, the request fails.
      const dnsRecordSOA: CpanelDnsRecord = dataArray.find(
        (item: CpanelDnsRecord) => item.record_type === "SOA"
      );
      console.log({ dnsRecordSOA });
      if (!dnsRecordSOA) return false;

      const dnsRecordSOAData = dnsRecordSOA.data_b64;

      if (!dnsRecordSOAData[2]) return false;

      const serialNumber = atob(dnsRecordSOAData[2]);
      console.log({ serialNumber });

      return Number(serialNumber);
    } catch (error) {
      console.log({ error });

      return false;
    }
  }

  async create(name: string): Promise<boolean> {
    try {
      const serialNumber = await this.getSerialNumber();
      console.log(serialNumber);
      // return true;

      if (!serialNumber) return false;

      const response = await axios.get(
        `${process.env.CPANEL_API_URL}/execute/DNS/mass_edit_zone`,
        {
          params: {
            serial: serialNumber,
            zone: process.env.APP_BASE_URL,
            add: JSON.stringify({
              dname: name,
              ttl: 3600,
              record_type: "CNAME",
              data: [process.env.APP_BASE_CNAME],
            }),
          },
          headers: {
            Authorization: `cpanel ${process.env.CPANEL_USER}:${process.env.CPANEL_API_KEY}`,
          },
        }
      );
      console.log({ response });

      if (response.status !== 200) return false;

      const { data } = response;
      return !!data.status;
    } catch (error) {
      console.log({ error });

      return false;
    }
  }
}
