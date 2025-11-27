import {
  pgTable,
  text,
  timestamp,
  uuid,
  decimal,
  integer,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { user } from './auth';
import { verificationStatusEnum } from './riders';

/**
 * Vendor profile schema
 * Vendor-specific data for users with 'vendor' role
 */

export const vendors = pgTable(
  'vendors',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' })
      .unique(),
    businessName: text('business_name').notNull(),
    ownerName: text('owner_name').notNull(),
    description: text('description'),
    logoUrl: text('logo_url'),
    coverImageUrl: text('cover_image_url'),
    galleryImages: text('gallery_images'), // JSONB stored as text
    marketLocation: text('market_location'),
    latitude: decimal('latitude', { precision: 10, scale: 8 }),
    longitude: decimal('longitude', { precision: 11, scale: 8 }),
    phone: text('phone'),
    whatsapp: text('whatsapp'),
    email: text('email'),
    verificationStatus: verificationStatusEnum('verification_status')
      .notNull()
      .default('pending'),
    rating: decimal('rating', { precision: 3, scale: 2 }).default('0.00'),
    totalRatings: integer('total_ratings').default(0),
    responseTimeAvg: integer('response_time_avg'),
    cancellationRate: decimal('cancellation_rate', {
      precision: 5,
      scale: 2,
    }).default('0.00'),
    isOnline: boolean('is_online').default(false),
    maxConcurrentOrders: integer('max_concurrent_orders').default(1),
    prepTimeDefault: integer('prep_time_default'),
    verifiedAt: timestamp('verified_at'),
    verifiedBy: uuid('verified_by').references(() => user.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);

export type Vendor = typeof vendors.$inferSelect;
export type NewVendor = typeof vendors.$inferInsert;

