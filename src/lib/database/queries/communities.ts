import { eq, sql } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { Schema } from "../index";
import { community } from "../community-schema";
import { calendar, event } from "../calendar-schema";
import { uuidToShortId } from "../uuid";

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

  async load(id: string): Promise<Community | null> {
    const rows = await this.db
      .select()
      .from(community)
      .where(eq(community.id, id))
      .limit(1);

    return rows[0] || null;
  }

  async loadByUid(uid: string): Promise<Community | null> {
    const rows = await this.db
      .select()
      .from(community)
      .where(eq(community.uid, uid))
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
        eventCount: sql<number>`COUNT(
          CASE
            WHEN ${event.show} IS NOT NULL AND ${event.show} = true THEN ${event.id}
            WHEN ${event.show} IS NULL AND ${event.cShow} = true THEN ${event.id}
          END
        )::int`,
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
