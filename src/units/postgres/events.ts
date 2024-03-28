import Postgres from ".";
import type { ProviderRegion } from "./providers.d";
import type { Event } from "./events.d";

export default class Events extends Postgres {
  async get(id: string): Promise<Event> {
    const rows = await this
      .sql`SELECT ev.*, pr.name as provider, pr.location FROM events AS ev LEFT JOIN providers AS pr ON pr.id = ev.host WHERE ev.id = ${id} LIMIT 1;`;
    return rows[0] as Event;
  }

  async list(region?: ProviderRegion): Promise<Event[]> {
    const rows = region
      ? await this
          .sql`SELECT ev.*, pr.name as provider FROM events AS ev LEFT JOIN providers AS pr ON pr.id = ev.host WHERE "startAt" > now() - interval '1 day' AND pr.location = ${region} ORDER BY "startAt";`
      : await this
          .sql`SELECT ev.*, pr.name as provider FROM events AS ev LEFT JOIN providers AS pr ON pr.id = ev.host WHERE "startAt" > now() - interval '1 day' AND pr.location IS NOT NULL ORDER BY "startAt";`;

    return rows as Event[];
  }

  async findByUser(id: number): Promise<Event[]> {
    const rows = await this
      .sql`SELECT * FROM events WHERE "userId" = ${id} AND "startAt" > now() - interval '1 day' AND ("show" IS TRUE OR ("show" IS NULL AND "cShow" IS TRUE))  ORDER BY "startAt";`;
    return rows as Event[];
  }
}
