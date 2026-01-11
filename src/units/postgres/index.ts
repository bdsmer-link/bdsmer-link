import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { type RequestEvent } from "@builder.io/qwik-city";

export default class Postgres {
  sql: NeonQueryFunction<false, false>;

  constructor(env: RequestEvent["env"]) {
    const connectionString = env.get("DATABASE_URL");
    if (!connectionString) {
      throw new Error("DATABASE_URL not found");
    }

    this.sql = neon(connectionString);
  }
}
