import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { type RequestEvent } from "@builder.io/qwik-city";

// import { WebSocket } from 'undici';
// import { neonConfig } from "@neondatabase/serverless";
// neonConfig.webSocketConstructor = WebSocket;

export default class Postgres {
  sql: NeonQueryFunction<false, false>;

  constructor(env: RequestEvent["env"]) {
    const connectionString = env.get("POSTGRES_URL_NON_POOLING");
    if (!connectionString) {
      throw new Error("POSTGRES_URL_NON_POOLING not found");
    }

    this.sql = neon(connectionString);
  }
}
