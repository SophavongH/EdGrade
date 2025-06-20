import { uuid, text, pgTable, timestamp, pgEnum, boolean, serial, integer, varchar} from 'drizzle-orm/pg-core';

export const ROLE_ENUM = pgEnum('role', ['admin', 'user']);

export const usersTable = pgTable('users_table', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  name: varchar('name', { length: 255 }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: ROLE_ENUM('role').notNull().default('user'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const classrooms = pgTable("classrooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  totalStudents: integer("total_students").default(0),
  archived: boolean("archived").default(false),
});