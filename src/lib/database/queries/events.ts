import { eq, sql, and, or, gt, isNull, isNotNull } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { Schema } from "../index";
import { community } from "../community-schema";
import { event } from "../calendar-schema";

export type Event = {
  id: string;
  summary: string | null;
  cSummary: string | null;
  startAt: Date;
  endAt: Date;
  show: boolean | null;
  cShow: boolean | null;
  communityId: string;
  form: string | null;
  cForm: string | null;
  description: string | null;
  cDescription: string | null;
  keywords: string[] | null;
  createdAt: Date;
  // Joined fields
  provider?: string | null;
  location?: string | null;
};

type EventRow = {
  id: string;
  summary: string | null;
  cSummary: string | null;
  startAt: Date | null;
  endAt: Date | null;
  show: boolean | null;
  cShow: boolean | null;
  communityId: string;
  form: string | null;
  cForm: string | null;
  description: string | null;
  cDescription: string | null;
  keywords: string[] | null;
  createdAt: Date;
  provider: string | null;
  location: string | null;
};

function formatEvent(row: EventRow): Event {
  return {
    ...row,
    startAt: row.startAt || new Date(),
    endAt: row.endAt || new Date(),
  };
}

export class Events {
  constructor(private db: NeonHttpDatabase<Schema>) {}

  async get(id: string): Promise<Event | null> {
    const rows = await this.db
      .select({
        id: event.id,
        summary: event.summary,
        cSummary: event.cSummary,
        startAt: event.startAt,
        endAt: event.endAt,
        show: event.show,
        cShow: event.cShow,
        communityId: event.communityId,
        form: event.form,
        cForm: event.cForm,
        description: event.description,
        cDescription: event.cDescription,
        keywords: event.keywords,
        createdAt: event.createdAt,
        provider: community.name,
        location: community.location,
      })
      .from(event)
      .leftJoin(community, eq(community.id, event.communityId))
      .where(eq(event.id, id))
      .limit(1);

    return rows[0] ? formatEvent(rows[0]) : null;
  }

  async list(): Promise<Event[]> {
    // Get events from communities with plan='space' users
    const rows = await this.db
      .select({
        id: event.id,
        summary: event.summary,
        cSummary: event.cSummary,
        startAt: event.startAt,
        endAt: event.endAt,
        show: event.show,
        cShow: event.cShow,
        communityId: event.communityId,
        form: event.form,
        cForm: event.cForm,
        description: event.description,
        cDescription: event.cDescription,
        keywords: event.keywords,
        createdAt: event.createdAt,
        provider: community.name,
        location: community.location,
      })
      .from(event)
      .leftJoin(community, eq(community.id, event.communityId))
      .where(
        and(
          isNotNull(event.communityId),
          gt(event.startAt, sql`now() - interval '1 day'`),
          or(
            eq(event.show, true),
            and(isNull(event.show), eq(event.cShow, true))
          )
        )
      )
      .orderBy(event.startAt);

    return rows.map(formatEvent);
  }

  async findByCommunity(communityId: string): Promise<Event[]> {
    const rows = await this.db
      .select({
        id: event.id,
        summary: event.summary,
        cSummary: event.cSummary,
        startAt: event.startAt,
        endAt: event.endAt,
        show: event.show,
        cShow: event.cShow,
        communityId: event.communityId,
        form: event.form,
        cForm: event.cForm,
        description: event.description,
        cDescription: event.cDescription,
        keywords: event.keywords,
        createdAt: event.createdAt,
        provider: community.name,
        location: community.location,
      })
      .from(event)
      .leftJoin(community, eq(community.id, event.communityId))
      .where(
        and(
          eq(event.communityId, communityId),
          gt(event.startAt, sql`now() - interval '1 day'`),
          or(
            eq(event.show, true),
            and(isNull(event.show), eq(event.cShow, true))
          )
        )
      )
      .orderBy(event.startAt);

    return rows.map(formatEvent);
  }

  /**
   * Find events by community uid
   */
  async findByCommunityUid(uid: string): Promise<Event[]> {
    const rows = await this.db
      .select({
        id: event.id,
        summary: event.summary,
        cSummary: event.cSummary,
        startAt: event.startAt,
        endAt: event.endAt,
        show: event.show,
        cShow: event.cShow,
        communityId: event.communityId,
        form: event.form,
        cForm: event.cForm,
        description: event.description,
        cDescription: event.cDescription,
        keywords: event.keywords,
        createdAt: event.createdAt,
        provider: community.name,
        location: community.location,
      })
      .from(event)
      .innerJoin(community, eq(community.id, event.communityId))
      .where(
        and(
          eq(community.uid, uid),
          gt(event.startAt, sql`now() - interval '1 day'`),
          or(
            eq(event.show, true),
            and(isNull(event.show), eq(event.cShow, true))
          )
        )
      )
      .orderBy(event.startAt);

    return rows.map(formatEvent);
  }
}

/**
 * Create an Events query instance
 */
export function createEventsQuery(db: NeonHttpDatabase<Schema>): Events {
  return new Events(db);
}
