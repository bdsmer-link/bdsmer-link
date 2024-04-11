import Postgres from ".";
import { type User, Theme } from "./users.d";

function formatUser(user: Partial<User>): User {
  return {
    ...user,
    theme: user.theme || Theme.default,
    links: user.links || [],
    colors: {
      primary: user.colors?.primary || "#72675a",
      secondary: user.colors?.secondary || "#725b5a",
      border: user.colors?.border || "#c5beb6",
      background: user.colors?.background || "#faf9f8",
      darkPrimary: user.colors?.darkPrimary || "#9a8d7f",
      darkSecondary: user.colors?.darkSecondary || "#9a807f",
      darkBorder: user.colors?.darkBorder || "#564d44",
      darkBackground: user.colors?.darkBackground || "#282320",
    },
  } as User;
}

export default class Users extends Postgres {
  async load(id: string): Promise<User> {
    const rows = await this.sql`SELECT * FROM users WHERE id=${id} LIMIT 1;`;
    if (!rows[0]) throw new Error(`User ${id} not found`);
    return formatUser(rows[0] as User);
  }

  async loadUid(uid: string): Promise<User | null> {
    const rows = await this.sql`SELECT * FROM users WHERE uid=${uid} LIMIT 1;`;
    return rows[0] && formatUser(rows[0] as User);
  }

  async findUid(): Promise<User[]> {
    const rows = await this.sql`SELECT uid FROM users WHERE uid IS NOT NULL;`;
    return rows as User[];
  }
}
