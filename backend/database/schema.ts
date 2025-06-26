import { text, pgTable, timestamp, pgEnum, boolean, serial, integer, varchar,uuid } from 'drizzle-orm/pg-core';

export const ROLE_ENUM = pgEnum('role', ['admin', 'user']);

export const usersTable = pgTable('users_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  email: text('email').notNull().unique(),
  role: ROLE_ENUM('role').notNull().default('user'),
  password: text('password').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
export const classrooms = pgTable("classrooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  totalStudents: integer("total_students").default(0),
  archived: boolean("archived").default(false),
  userId: uuid('user_id').notNull(), // FK to usersTable
});

export const students = pgTable('students', {
  id: uuid('id').primaryKey().defaultRandom(),
  studentId: varchar('student_id', { length: 8 }).unique(), // remove .notNull().default('')
  name: varchar('name', { length: 255 }).notNull(),
  avatar: text('avatar'),
  gender: text('gender').notNull(),
  parentPhone: varchar('parent_phone', { length: 32 }),
  dob: varchar('dob', { length: 32 }),
  address: text('address'),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const classroomStudents = pgTable('classroom_students', {
  id: serial('id').primaryKey(),
  classroomId: integer('classroom_id').notNull(),
  studentId: uuid('student_id').notNull(),
});
