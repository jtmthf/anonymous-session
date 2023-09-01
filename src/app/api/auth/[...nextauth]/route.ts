import { randomUUID } from "crypto";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "anonymous",
      credentials: {},
      async authorize() {
        const cart = await prisma.cart.create({ data: {} });

        return { id: randomUUID(), cartId: cart.id };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.cartId = user.cartId;
      }

      return token;
    },
    session({ session, token }) {
      if (token.cartId) {
        session.user.cartId = token.cartId;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
