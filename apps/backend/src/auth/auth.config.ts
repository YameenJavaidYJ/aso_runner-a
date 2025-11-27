import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@alain/database';

/**
 * BetterAuth configuration
 * Uses extended user schema with custom fields
 * The drizzle adapter automatically uses the user table from our schema
 */
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || '',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3001',
  basePath: '/api/auth',
  // Custom fields in user table are automatically available
  // BetterAuth will use the extended schema we defined
});

