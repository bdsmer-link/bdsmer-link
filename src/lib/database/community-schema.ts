import { relations } from "drizzle-orm";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { generateUuidV7 } from "./uuid";

/**
 * Community profile schema
 * Stores community public profile information
 */
export const community = pgTable("community", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => generateUuidV7()),
  uid: varchar("uid", { length: 255 }).unique(),

  // Profile content
  name: text("name"),
  avatar: text("avatar"),
  introduction: text("introduction"),

  // Location
  location: text("location"),

  // External links
  website: text("website"),
});

export const communityRelations = relations(community, ({ many }) => ({
  calendars: many(calendar),
  events: many(event),
}));

// Import after community is defined to avoid circular dependency
import { calendar, event } from "./calendar-schema";
