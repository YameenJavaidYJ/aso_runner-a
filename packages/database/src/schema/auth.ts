import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core';

/**
 * BetterAuth required tables
 * Following BetterAuth schema requirements for PostgreSQL
 * Extended with custom fields for multi-actor support
 */

export const userStatusEnum = pgEnum('user_status', [
  'active',
  'suspended',
  'pending_verification',
  'deleted',
]);

export const languageEnum = pgEnum('language', ['fr', 'en']);

export const user = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  // Extended fields
  phone: text('phone').unique(),
  phoneVerified: boolean('phoneVerified').default(false),
  status: userStatusEnum('status').notNull().default('active'),
  language: languageEnum('language').default('fr'),
  currency: text('currency').default('XAF'),
  lastLoginAt: timestamp('lastLoginAt'),
  profilePicture: text('profilePicture'), // JSONB stored as text, can be parsed
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const session = pgTable('session', {
  id: uuid('id').defaultRandom().primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
  id: uuid('id').defaultRandom().primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const verification = pgTable('verification', {
  id: uuid('id').defaultRandom().primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

