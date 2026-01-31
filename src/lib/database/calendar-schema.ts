import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  index,
  uuid,
  integer,
  date,
  primaryKey,
} from "drizzle-orm/pg-core";
import { generateUuidV7, uuidToShortId } from "./uuid";
import { community } from "./community-schema";

/**
 * Calendars table - stores community calendar sync settings
 */
export const calendar = pgTable(
  "calendar",
  {
    communityId: uuid("communityId")
      .primaryKey()
      .references(() => community.id, { onDelete: "cascade" }),
    id: text("id"), // Google Calendar ID
    lastCheckedAt: timestamp("lastCheckedAt", { withTimezone: true }),
    lastCheckedError: text("lastCheckedError"),
  },
  (table) => [index("calendar_id_idx").on(table.id)]
);

/**
 * Events table - stores calendar events
 */
export const event = pgTable(
  "event",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => uuidToShortId(generateUuidV7())),
    summary: text("summary"), // Event title
    cSummary: text("cSummary"), // Custom event title
    startAt: timestamp("startAt", { withTimezone: true }),
    endAt: timestamp("endAt", { withTimezone: true }),
    form: text("form"), // Original form/format
    description: text("description"),
    communityId: uuid("communityId")
      .notNull()
      .references(() => community.id, { onDelete: "cascade" }),
    cForm: text("cForm"), // Custom form
    cDescription: text("cDescription"), // Custom description
    keywords: text("keywords").array(), // Event keywords/tags
    createdAt: timestamp("createdAt", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("event_communityId_idx").on(table.communityId),
    index("event_startAt_idx").on(table.startAt),
  ]
);

// Relations
export const calendarRelations = relations(calendar, ({ one }) => ({
  community: one(community, {
    fields: [calendar.communityId],
    references: [community.id],
  }),
}));

export const eventRelations = relations(event, ({ one, many }) => ({
  community: one(community, {
    fields: [event.communityId],
    references: [community.id],
  }),
  clicks: many(eventClick),
}));

/**
 * Event clicks table - tracks daily click counts per event
 */
export const eventClick = pgTable(
  "event_click",
  {
    eventId: text("eventId")
      .notNull()
      .references(() => event.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    count: integer("count").notNull().default(0),
  },
  (table) => [
    primaryKey({ columns: [table.eventId, table.date] }),
    index("event_click_eventId_idx").on(table.eventId),
    index("event_click_date_idx").on(table.date),
  ]
);

export const eventClickRelations = relations(eventClick, ({ one }) => ({
  event: one(event, {
    fields: [eventClick.eventId],
    references: [event.id],
  }),
}));
