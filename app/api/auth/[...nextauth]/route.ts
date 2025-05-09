import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
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
    strategy: 'jwt',
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
      // Attach all user fields from token to session.user
      session.user = {
        ...session.user,
        ...token,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST }; 