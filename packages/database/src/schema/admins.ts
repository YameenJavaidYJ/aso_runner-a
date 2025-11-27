import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth';

/**
 * Admin profile schema
 * Admin-specific metadata for users with 'admin', 'support_admin', or 'finance_admin' roles
 */

export const admins = pgTable(
  'admins',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' })
      .unique(),
    department: text('department'),
    permissionsLevel: text('permissions_level'),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);

export type Admin = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;

