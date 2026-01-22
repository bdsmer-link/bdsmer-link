import { eq } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { Schema } from "../index";
import { calendar } from "../calendar-schema";
import { community } from "../community-schema";

export type Calendar = {
  communityId: string;
  id: string | null;
  lastCheckedAt: Date | null;
  lastCheckedError: string | null;
};

export class Calendars {
  constructor(private db: NeonHttpDatabase<Schema>) {}

  async loadByCommunityId(communityId: string): Promise<Calendar | null> {
    const rows = await this.db
      .select()
      .from(calendar)
      .where(eq(calendar.communityId, communityId))
      .limit(1);

    return rows[0] || null;
  }

  /**
   * Load calendar by community uid
   */
  async loadByCommunityUid(uid: string): Promise<Calendar | null> {
    const rows = await this.db
      .select({
        communityId: calendar.communityId,
        id: calendar.id,
        lastCheckedAt: calendar.lastCheckedAt,
        lastCheckedError: calendar.lastCheckedError,
      })
      .from(calendar)
      .innerJoin(community, eq(community.id, calendar.communityId))
      .where(eq(community.uid, uid))
      .limit(1);

    return rows[0] || null;
  }
}

/**
 * Create a Calendars query instance
 */
export function createCalendarsQuery(db: NeonHttpDatabase<Schema>): Calendars {
  return new Calendars(db);
}
