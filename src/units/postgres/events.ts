import Postgres from ".";
import type { Event } from "./events.d";

export default class Events extends Postgres {
  async get(id: string): Promise<Event> {
    const rows = await this.sql(
      `SELECT ev.*, pr.name as provider, pr.region FROM events AS ev LEFT JOIN providers AS pr ON pr.id = ev.host WHERE ev.id = $1 LIMIT 1;`,
      [id],
    );
    return rows[0] as Event;
  }

  async list(): Promise<Event[]> {
    const rows = await this.sql`SELECT ev.*, ur.nickname AS provider
      FROM events AS ev
      LEFT JOIN users AS ur ON ur.id = ev."userId"
      WHERE "startAt" > now() - interval '1 day' AND ur.plan = 'space' AND ("show" IS TRUE OR ("show" IS NULL AND "cShow" IS TRUE))
      ORDER BY "startAt";`;

    return rows as Event[];
  }

  async findByUser(id: number): Promise<Event[]> {
    const rows = await this.sql(
      `SELECT * FROM events WHERE "userId" = $1 AND "startAt" > now() - interval '1 day' AND ("show" IS TRUE OR ("show" IS NULL AND "cShow" IS TRUE))  ORDER BY "startAt";`,
      [id],
    );
    return rows as Event[];
  }
}
