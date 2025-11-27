import { pgTable, text, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { user } from './auth';

/**
 * User roles junction table
 * Supports multi-actor system where users can have multiple roles
 */

export const userRoleEnum = pgEnum('user_role', [
  'customer',
  'rider',
  'vendor',
  'admin',
  'support_admin',
  'finance_admin',
]);

export const userRoles = pgTable('user_roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: userRoleEnum('role').notNull(),
  assignedAt: timestamp('assigned_at').defaultNow().notNull(),
  assignedBy: uuid('assigned_by').references(() => user.id),
});

export type UserRole = typeof userRoles.$inferSelect;
export type NewUserRole = typeof userRoles.$inferInsert;

