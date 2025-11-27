import { createAuthClient } from 'better-auth/react-native';

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3001',
});

