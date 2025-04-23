import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Extend the Session type to include custom properties
   */
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }

  /**
   * Extend the User type to include custom properties
   */
  interface User {
    id: string;
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the JWT type to include custom properties
   */
  interface JWT {
    id?: string;
    role?: string;
  }
} 