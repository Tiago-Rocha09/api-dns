import axios, { AxiosError } from "axios";
import { HostGateway } from "./host.gateway";

export class HostVercelGateway implements HostGateway {
  async addDomain(domain: string) {
    try {
      const response = await axios.post(
        `${process.env.VERCEL_API_URL}/v10/projects/${process.env.VERCEL_PROJECT_ID}/domains`,
        {
          name: domain,
        },
        {
          params: {
            teamId: process.env.VERCEL_TEAM_ID,
          },
          headers: {
            Authorization: `Bearer ${process.env.VERCEL_API_ACCESS_TOKEN}`,
          },
        }
      );

      if (response.status !== 200) return false;

      return true;
    } catch (error) {
      console.log({ error });
      if (error instanceof AxiosError) {
        console.log({ data: error.response?.data });
      }

      return false;
    }
  }
}
