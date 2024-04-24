import Postgres from ".";
import type { UserRegion } from "./users.d";
import type { Event } from "./events.d";

export default class Events extends Postgres {
  async get(id: string): Promise<Event> {
    const rows = await this
      .sql`SELECT ev.*, pr.name as provider, pr.region FROM events AS ev LEFT JOIN providers AS pr ON pr.id = ev.host WHERE ev.id = ${id} LIMIT 1;`;
    return rows[0] as Event;
  }

  async list(region?: UserRegion): Promise<Event[]> {
    const rows = region
      ? await this.sql`SELECT ev.*, COALESCE(ur.nickname, pr.name) AS provider
          FROM events AS ev
          LEFT JOIN providers AS pr ON pr.id = ev.host AND pr.region = ${region}
          LEFT JOIN users AS ur ON ur.id = ev."userId" AND ur.plan = 'space' AND ur.region = ${region}
          WHERE "startAt" > now() - interval '1 day' AND COALESCE(ur.nickname, pr.name) IS NOT NULL AND ("show" IS TRUE OR ("show" IS NULL AND "cShow" IS TRUE))
          ORDER BY "startAt";`
      : await this.sql`SELECT ev.*, COALESCE(ur.nickname, pr.name) AS provider
          FROM events AS ev
          LEFT JOIN providers AS pr ON pr.id = ev.host
          LEFT JOIN users AS ur ON ur.id = ev."userId" AND ur.plan = 'space'
          WHERE "startAt" > now() - interval '1 day' AND COALESCE(ur.nickname, pr.name) IS NOT NULL AND ("show" IS TRUE OR ("show" IS NULL AND "cShow" IS TRUE))
          ORDER BY "startAt";`;

    return rows as Event[];
  }

  async findByUser(id: number): Promise<Event[]> {
    const rows = await this
      .sql`SELECT * FROM events WHERE "userId" = ${id} AND "startAt" > now() - interval '1 day' AND ("show" IS TRUE OR ("show" IS NULL AND "cShow" IS TRUE))  ORDER BY "startAt";`;
    return rows as Event[];
  }
}
