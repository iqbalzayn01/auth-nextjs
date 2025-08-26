import { v4 as uuid } from 'uuid';
import { encode as defaultEncode } from 'next-auth/jwt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { loginSchema } from './schema';
import authConfig from './auth.config';
import prisma from './prisma';
import NextAuth from 'next-auth';
import bcrypt from 'bcrypt';

const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  session: { strategy: 'jwt' },
  ...authConfig,
  providers: [
    ...authConfig.providers,
    {
      ...authConfig.providers[0],
      authorize: async (credentials) => {
        try {
          const validatedCredentials = loginSchema.parse(credentials);

          const user = await prisma.user.findUnique({
            where: {
              email: validatedCredentials.email,
            },
          });

          if (!user) {
            throw new Error('Invalid credentials.');
          }

          const isPasswordValid = await bcrypt.compare(
            validatedCredentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error('Invalid credentials.');
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === 'credentials') {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error('No user ID found in token');
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error('Failed to create session');
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
});
