import Postgres from ".";
import { type Calendar } from "./calendars.d";

export default class Calendars extends Postgres {
  async loadByUserId(userId: number): Promise<Calendar | null> {
    const rows = await this
      .sql`SELECT * FROM calendars WHERE "userId"=${userId} LIMIT 1;`;
    return rows[0] as Calendar;
  }
}
