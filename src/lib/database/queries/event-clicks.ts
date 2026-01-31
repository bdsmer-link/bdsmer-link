import { eq, sql, and } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { Schema } from "../index";
import { eventClick } from "../calendar-schema";

export type EventClick = {
  eventId: string;
  date: string;
  count: number;
};

export class EventClicks {
  constructor(private db: NeonHttpDatabase<Schema>) {}

  /**
   * Increment click count for an event on current date
   * Uses upsert to create or increment the count
   */
  async increment(eventId: string): Promise<void> {
    const today = new Date().toISOString().split("T")[0];

    await this.db
      .insert(eventClick)
      .values({
        eventId,
        date: today,
        count: 1,
      })
      .onConflictDoUpdate({
        target: [eventClick.eventId, eventClick.date],
        set: {
          count: sql`${eventClick.count} + 1`,
        },
      });
  }

  /**
   * Get total clicks for an event
   */
  async getTotalClicks(eventId: string): Promise<number> {
    const result = await this.db
      .select({
        total: sql<number>`COALESCE(SUM(${eventClick.count}), 0)`,
      })
      .from(eventClick)
      .where(eq(eventClick.eventId, eventId));

    return result[0]?.total ?? 0;
  }

  /**
   * Get clicks by date for an event
   */
  async getClicksByDate(eventId: string): Promise<EventClick[]> {
    return await this.db
      .select({
        eventId: eventClick.eventId,
        date: eventClick.date,
        count: eventClick.count,
      })
      .from(eventClick)
      .where(eq(eventClick.eventId, eventId))
      .orderBy(eventClick.date);
  }
}

export function createEventClicksQuery(
  db: NeonHttpDatabase<Schema>
): EventClicks {
  return new EventClicks(db);
}
