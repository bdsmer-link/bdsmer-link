import Postgres from ".";
import type { Provider } from "./providers.d";

export default class Providers extends Postgres {
  async load(id: number): Promise<Provider> {
    const rows = await this
      .sql`SELECT * FROM providers WHERE id=${id} LIMIT 1;`;
    return rows[0] as Provider;
  }
}
