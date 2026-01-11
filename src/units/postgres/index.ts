import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { type RequestEvent } from "@builder.io/qwik-city";

// import { WebSocket } from 'undici';
// import { neonConfig } from "@neondatabase/serverless";
// neonConfig.webSocketConstructor = WebSocket;

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
