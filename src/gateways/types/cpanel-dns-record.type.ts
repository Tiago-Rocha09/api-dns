export type CpanelDnsRecord = {
  dname_b64: string;
  line_index: number;
  data_b64: string[];
  ttl: 86400;
  type: string;
  record_type: string;
};
