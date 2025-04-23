import type { NextAuthOptions } from 'next-auth';

// Temporary auth options for build to succeed
export const authOptions: NextAuthOptions = {
  providers: [],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build',
}; 