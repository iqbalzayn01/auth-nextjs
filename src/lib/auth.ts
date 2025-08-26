import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import prisma from './prisma';
import NextAuth from 'next-auth';

const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 60 * 60, // 1 hours
  },
  ...authConfig,
  providers: [...authConfig.providers],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
});
