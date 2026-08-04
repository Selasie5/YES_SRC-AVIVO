import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

export const registrationTypeEnum = pgEnum("registration_type", [
  "delegate",
  "sponsor",
  "partner",
]);

export const registrationStatusEnum = pgEnum("registration_status", [
  "pending",
  "approved",
  "checked_in",
]);

export const registrations = pgTable("registrations", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: registrationTypeEnum("type").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  organization: text("organization"),
  roleTitle: text("role_title"),
  notes: text("notes"),
  metadata: jsonb("metadata").$type<Record<string, string>>(),
  status: registrationStatusEnum("status").default("pending").notNull(),
  checkedInAt: timestamp("checked_in_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const speakers = pgTable("speakers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
  topics: jsonb("topics").$type<string[]>(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const partners = pgTable("partners", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  imageUrl: text("image_url"),
  className: text("class_name"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;
export type Speaker = typeof speakers.$inferSelect;
export type Partner = typeof partners.$inferSelect;
