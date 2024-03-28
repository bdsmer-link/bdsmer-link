import Postgres from ".";

export type Skill = {
  id?: number;
  category: string;
  name: string;
  items: string[];
  link: string;
};

export default class Skills extends Postgres {
  async list(): Promise<Skill[]> {
    const rows = await this.sql`SELECT * FROM skills;`;
    return rows as Skill[];
  }
}
