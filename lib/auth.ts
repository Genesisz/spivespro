import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { db } = await connectToDatabase();
        const user = await db.collection('registrations').findOne({ email: credentials.email });
        if (!user) return null;
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;
        // Remove sensitive info before returning
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
          const user = await db.collection('registrations').findOne({ email: token.email });
          if (user) {
            const { password, ...userWithoutPass } = user;
            session.user = {
              ...session.user,
              ...userWithoutPass,
              id: user._id.toString(),
            } as any;
          }
        } catch (error) {
          console.error('Error fetching user data in session:', error);
          // Fallback to token data if database fetch fails
          session.user = {
            ...session.user,
            ...token,
          } as any;
        }
      } else {
        // Fallback to token data
        session.user = {
          ...session.user,
          ...token,
        } as any;
      }
      return session;
    },
  },
};
