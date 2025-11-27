import { pgTable, text, timestamp, uuid, decimal, integer } from 'drizzle-orm/pg-core';
import { user } from './auth';

/**
 * Customer profile schema
 * Customer-specific data for users with 'customer' role
 */

export const customers = pgTable(
  'customers',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' })
      .unique(),
    defaultAddressId: uuid('default_address_id'),
    loyaltyPoints: integer('loyalty_points').default(0),
    totalOrders: integer('total_orders').default(0),
    totalSpent: decimal('total_spent', { precision: 10, scale: 2 }).default(
      '0.00'
    ),
    preferredLanguage: text('preferred_language').default('fr'),
    notificationPreferences: text('notification_preferences'), // JSONB stored as text
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;

