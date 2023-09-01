import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      cartId: string;
    } & DefaultSession["user"];
  }

  interface User {
    cartId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    cartId?: string;
  }
}
