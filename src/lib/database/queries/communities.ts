import { eq, or, sql } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { Schema } from "../index";
import { community } from "../community-schema";
import { calendar, event } from "../calendar-schema";
import { uuidToShortId, isShortId, shortIdToUuid, isUuid } from "../uuid";

export type Community = {
  id: string;
  uid: string | null;
  name: string | null;
  avatar: string | null;
  introduction: string | null;
  location: string | null;
  website: string | null;
};

export type Space = {
  id: string;
  uid: string | null;
  website: string | null;
  name: string | null;
  avatar: string | null;
  location: string | null;
  lastCheckedAt: Date | null;
  lastCheckedError: boolean;
  eventCount: number;
};

export class Communities {
  constructor(private db: NeonHttpDatabase<Schema>) {}

  /**
   * Load community by identifier (UUID, shortId, or uid)
   */
  async load(identifier: string): Promise<Community | null> {
    let uuid: string | null = null;

    if (isUuid(identifier)) {
      uuid = identifier;
    } else if (isShortId(identifier)) {
      uuid = shortIdToUuid(identifier);
    }

    const rows = await this.db
      .select()
      .from(community)
      .where(
        uuid
          ? or(eq(community.id, uuid), eq(community.uid, identifier))
          : eq(community.uid, identifier)
      )
      .limit(1);

    return rows[0] || null;
  }

  async listSpaces(): Promise<Space[]> {
    const rows = await this.db
      .select({
        id: community.id,
        uid: community.uid,
        website: community.website,
        name: community.name,
        avatar: community.avatar,
        location: community.location,
        lastCheckedAt: calendar.lastCheckedAt,
        lastCheckedError: sql<boolean>`CASE WHEN ${calendar.lastCheckedError} IS NULL THEN FALSE ELSE TRUE END`,
        eventCount: sql<number>`COUNT(${event.id})::int`,
      })
      .from(community)
      .leftJoin(calendar, eq(calendar.communityId, community.id))
      .leftJoin(event, eq(event.communityId, community.id))
      .groupBy(community.id, calendar.lastCheckedAt, calendar.lastCheckedError);

    return rows.map((row) => ({
      ...row,
      id: uuidToShortId(row.id),
    }));
  }
}

/**
 * Create a Communities query instance
 */
export function createCommunitiesQuery(
  db: NeonHttpDatabase<Schema>
): Communities {
  return new Communities(db);
}
