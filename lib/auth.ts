import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { AppUser } from './useUser';
import { ObjectId } from 'mongodb';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: AppUser;
  }
}

type DatabaseUser = {
  _id: ObjectId;
  email: string;
  password: string;
  [key: string]: unknown;
};

type TokenUser = {
  email?: string | null;
  name?: string | null;
  picture?: string | null;
  [key: string]: unknown;
};

// Helper function to sanitize user data
const sanitizeUser = (user: TokenUser): AppUser => {
  const sanitized: Partial<AppUser> = {
    ...user,
    email: user.email || undefined,
  };
  return sanitized as AppUser;
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password');
        }
        
        const { db } = await connectToDatabase();
        const user = await db.collection('registrations').findOne({ email: credentials.email }) as DatabaseUser | null;
        
        if (!user) {
          throw new Error('No user found with this email address');
        }
        
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }
        
        // Remove sensitive info before returning
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPass } = user;
        return { ...userWithoutPass, id: user._id.toString() };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Attach all user fields to the token
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      // Fetch fresh user data from database to include any updates
      if (token.email) {
        try {
          const { db } = await connectToDatabase();
          const user = await db.collection('registrations').findOne({ email: token.email }) as DatabaseUser | null;
          if (user) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...userWithoutPass } = user;
            session.user = sanitizeUser({
              ...session.user,
              ...userWithoutPass,
              id: user._id.toString(),
            });
          }
        } catch (error) {
          console.error('Error fetching user data in session:', error);
          // Fallback to token data if database fetch fails
          session.user = sanitizeUser({
            ...session.user,
            ...token,
          });
        }
      } else {
        // Fallback to token data
        session.user = sanitizeUser({
          ...session.user,
          ...token,
        });
      }
      return session;
    },
  },
};
