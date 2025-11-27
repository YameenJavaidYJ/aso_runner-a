import {
  pgTable,
  text,
  timestamp,
  uuid,
  date,
  decimal,
  integer,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { user } from './auth';

/**
 * Rider-related database schemas
 * Following clean architecture principles
 */

export const verificationStatusEnum = pgEnum('verification_status', [
  'pending',
  'approved',
  'rejected',
  'suspended',
]);

export const documentStatusEnum = pgEnum('document_status', [
  'pending',
  'approved',
  'rejected',
]);

export const verificationActionEnum = pgEnum('verification_action', [
  'submitted',
  'approved',
  'rejected',
  'requested_info',
]);

export const payoutStatusEnum = pgEnum('payout_status', [
  'pending',
  'available',
  'on_hold',
  'paid',
]);

export const payoutTransactionStatusEnum = pgEnum('payout_transaction_status', [
  'pending',
  'processing',
  'completed',
  'failed',
  'cancelled',
]);

export const riders = pgTable(
  'riders',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' })
      .unique(),
  fullName: text('full_name').notNull(),
  dateOfBirth: date('date_of_birth'),
  emergencyContactName: text('emergency_contact_name'),
  emergencyContactPhone: text('emergency_contact_phone'),
  verificationStatus: verificationStatusEnum('verification_status')
    .notNull()
    .default('pending'),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0.00'),
  totalRatings: integer('total_ratings').default(0),
  totalDeliveries: integer('total_deliveries').default(0),
  acceptanceRate: decimal('acceptance_rate', { precision: 5, scale: 2 }).default(
    '0.00'
  ),
  onTimeRate: decimal('on_time_rate', { precision: 5, scale: 2 }).default(
    '0.00'
  ),
  cancellationRate: decimal('cancellation_rate', {
    precision: 5,
    scale: 2,
  }).default('0.00'),
  isOnline: boolean('is_online').default(false),
  lastOnlineAt: timestamp('last_online_at'),
  currentLatitude: decimal('current_latitude', { precision: 10, scale: 8 }),
  currentLongitude: decimal('current_longitude', { precision: 11, scale: 8 }),
  verifiedAt: timestamp('verified_at'),
  verifiedBy: uuid('verified_by').references(() => user.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const riderDocuments = pgTable('rider_documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  riderId: uuid('rider_id')
    .notNull()
    .references(() => riders.id, { onDelete: 'cascade' }),
  documentTypeId: uuid('document_type_id').notNull(),
  documentUrl: text('document_url').notNull(),
  status: documentStatusEnum('status').notNull().default('pending'),
  expiryDate: date('expiry_date'),
  adminNotes: text('admin_notes'),
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
  reviewedAt: timestamp('reviewed_at'),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
});

export const riderVerificationHistory = pgTable('rider_verification_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  riderId: uuid('rider_id')
    .notNull()
    .references(() => riders.id, { onDelete: 'cascade' }),
  action: verificationActionEnum('action').notNull(),
  notes: text('notes'),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const vehicleTypes = pgTable('vehicle_types', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
});

export const vehicles = pgTable('vehicles', {
  id: uuid('id').defaultRandom().primaryKey(),
  riderId: uuid('rider_id')
    .notNull()
    .references(() => riders.id, { onDelete: 'cascade' }),
  vehicleTypeId: uuid('vehicle_type_id')
    .notNull()
    .references(() => vehicleTypes.id),
  plateNumber: text('plate_number').notNull().unique(),
  color: text('color'),
  insuranceExpiry: date('insurance_expiry'),
  registrationNumber: text('registration_number'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const riderServiceZones = pgTable('rider_service_zones', {
  id: uuid('id').defaultRandom().primaryKey(),
  riderId: uuid('rider_id')
    .notNull()
    .references(() => riders.id, { onDelete: 'cascade' }),
  deliveryZoneId: uuid('delivery_zone_id').notNull(),
  isPreferred: boolean('is_preferred').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const riderAvailability = pgTable('rider_availability', {
  id: uuid('id').defaultRandom().primaryKey(),
  riderId: uuid('rider_id')
    .notNull()
    .references(() => riders.id, { onDelete: 'cascade' })
    .unique(),
  isAvailable: boolean('is_available').default(false),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  lastUpdatedAt: timestamp('last_updated_at').defaultNow().notNull(),
});

export const riderLocations = pgTable('rider_locations', {
  id: uuid('id').defaultRandom().primaryKey(),
  riderId: uuid('rider_id')
    .notNull()
    .references(() => riders.id, { onDelete: 'cascade' }),
  latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
  longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
  recordedAt: timestamp('recorded_at').defaultNow().notNull(),
});

export const riderEarnings = pgTable('rider_earnings', {
  id: uuid('id').defaultRandom().primaryKey(),
  riderId: uuid('rider_id')
    .notNull()
    .references(() => riders.id, { onDelete: 'cascade' }),
  deliveryAssignmentId: uuid('delivery_assignment_id').notNull(),
  baseFee: decimal('base_fee', { precision: 10, scale: 2 }).notNull(),
  distanceFee: decimal('distance_fee', { precision: 10, scale: 2 }).default(
    '0.00'
  ),
  surgeMultiplier: decimal('surge_multiplier', {
    precision: 5,
    scale: 2,
  }).default('1.00'),
  bonus: decimal('bonus', { precision: 10, scale: 2 }).default('0.00'),
  tip: decimal('tip', { precision: 10, scale: 2 }).default('0.00'),
  totalEarnings: decimal('total_earnings', { precision: 10, scale: 2 }).notNull(),
  payoutStatus: payoutStatusEnum('payout_status')
    .notNull()
    .default('pending'),
  payoutId: uuid('payout_id'),
  earnedAt: timestamp('earned_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const riderPayouts = pgTable('rider_payouts', {
  id: uuid('id').defaultRandom().primaryKey(),
  riderId: uuid('rider_id')
    .notNull()
    .references(() => riders.id, { onDelete: 'cascade' }),
  payoutMethodId: uuid('payout_method_id').notNull(),
  scheduleId: uuid('schedule_id'),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  fees: decimal('fees', { precision: 10, scale: 2 }).default('0.00'),
  netAmount: decimal('net_amount', { precision: 10, scale: 2 }).notNull(),
  status: payoutTransactionStatusEnum('status')
    .notNull()
    .default('pending'),
  payoutReference: text('payout_reference'),
  providerResponse: text('provider_response'),
  failureReason: text('failure_reason'),
  requestedAt: timestamp('requested_at').defaultNow().notNull(),
  processedAt: timestamp('processed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Type exports
export type Rider = typeof riders.$inferSelect;
export type NewRider = typeof riders.$inferInsert;

export type RiderDocument = typeof riderDocuments.$inferSelect;
export type NewRiderDocument = typeof riderDocuments.$inferInsert;

export type RiderVerificationHistory =
  typeof riderVerificationHistory.$inferSelect;
export type NewRiderVerificationHistory =
  typeof riderVerificationHistory.$inferInsert;

export type VehicleType = typeof vehicleTypes.$inferSelect;
export type NewVehicleType = typeof vehicleTypes.$inferInsert;

export type Vehicle = typeof vehicles.$inferSelect;
export type NewVehicle = typeof vehicles.$inferInsert;

export type RiderServiceZone = typeof riderServiceZones.$inferSelect;
export type NewRiderServiceZone = typeof riderServiceZones.$inferInsert;

export type RiderAvailability = typeof riderAvailability.$inferSelect;
export type NewRiderAvailability = typeof riderAvailability.$inferInsert;

export type RiderLocation = typeof riderLocations.$inferSelect;
export type NewRiderLocation = typeof riderLocations.$inferInsert;

export type RiderEarning = typeof riderEarnings.$inferSelect;
export type NewRiderEarning = typeof riderEarnings.$inferInsert;

export type RiderPayout = typeof riderPayouts.$inferSelect;
export type NewRiderPayout = typeof riderPayouts.$inferInsert;

