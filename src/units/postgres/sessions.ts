import Postgres from ".";

export type Session = {
  id: string;
  userId: number;
  sessionIdentity: string;
  noise: string;
  expires: Date;
  ip: string | null;
  city: string | null;
  country: string | null;
  userAgent: string | null;
  lastConnected: Date;
};

export default class Sessions extends Postgres {
  async load(id: string): Promise<Session> {
    const rows = await this
      .sql`SELECT * FROM sessions WHERE expires > NOW() AND id=${id} LIMIT 1;`;
    if (!rows[0]) throw new Error(`Session ${id} not found`);
    return rows[0] as Session;
  }
}
