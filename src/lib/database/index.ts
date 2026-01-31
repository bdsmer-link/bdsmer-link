import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as calendarSchema from "./calendar-schema";
import * as communitySchema from "./community-schema";

export const schema = {
  ...calendarSchema,
  ...communitySchema,
};

export type Schema = typeof schema;

/**
 * Create a database connection from environment
 * For Qwik applications, pass the env from RequestEvent
 */
export function createDatabase(
  connectionString: string
): NeonHttpDatabase<Schema> {
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

/**
 * Get database connection from environment
 * Usage in Qwik route handlers:
 *
 * ```ts
 * import { getDatabase, Communities, Events } from '~/lib/database';
 *
 * export const useCommunity = routeLoader$(async ({ env, params }) => {
 *   const db = getDatabase(env);
 *   const communities = new Communities(db);
 *   return communities.loadByUid(params.uid);
 * });
 * ```
 */
export function getDatabase(env: {
  get: (key: string) => string | undefined;
}): NeonHttpDatabase<Schema> {
  const connectionString = env.get("DATABASE_URL");
  if (!connectionString) {
    throw new Error("DATABASE_URL not found");
  }
  return createDatabase(connectionString);
}

// Re-export schemas for direct access
export { calendarSchema, communitySchema };

// Re-export commonly used items
export { community } from "./community-schema";
export { calendar, event, eventClick } from "./calendar-schema";

// Re-export query classes and factories
export {
  Events,
  createEventsQuery,
  Calendars,
  createCalendarsQuery,
  Communities,
  createCommunitiesQuery,
  EventClicks,
  createEventClicksQuery,
} from "./queries";
export type { Event, Calendar, Community, Space, EventClick } from "./queries";

// Re-export UUID utilities
export { shortIdToUuid, uuidToShortId } from "./uuid";

// Re-export types
export {
  UserLinkType,
  Theme,
} from "./types";
export type {
  UserLink,
  UserLinkText,
  UserLinkPicture,
  UserLinkHr,
  UserLinkAlbum,
  UserLinkAlbumPicture,
  UserLinkSocial,
  UserLinkMessage,
  CommunityColors,
} from "./types";
