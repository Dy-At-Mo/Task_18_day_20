
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  body: text("body").notNull(),

  created_at: timestamp("created_at", {
    withTimezone: false,
    mode: "date",
  })
    .notNull()
    .defaultNow(),

  done: boolean("done").notNull().default(false),
});
