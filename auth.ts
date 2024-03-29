import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
  } from "next";
  import type { NextAuthOptions } from "next-auth";
  import { getServerSession } from "next-auth";
  import GoogleProvider from "next-auth/providers/google";
  import { adminAuth, adminDB } from "@/firebase-db/firebase-admin";
  import  { FirestoreAdapter } from "@next-auth/firebase-adapter";
  
  // You'll need to import and pass this
  // to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
  export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      session: async ({ session, token }) => {
        //   Add ID to user field
        if (session?.user) {
          if (token?.sub) {
            session.user.id = token.sub;
  
            // Add firebase token to session
            // SOLUTION to firebase not syncing
            // https://github.com/nextauthjs/next-auth/discussions/7157
            const firebaseToken = await adminAuth.createCustomToken(token.sub);
            session.firebaseToken = firebaseToken;
          }
        }
  
        return session;
      },
      jwt: async ({ user, token }) => {
        if (user) {
          token.sub = user.id;
        }
        return token;
      },
    },
  
    session: {
      strategy: "jwt",
    },
    adapter: FirestoreAdapter(adminDB),
  } satisfies NextAuthOptions;
  
  // Use it in server contexts
  export function auth(
    ...args:
      | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
      | [NextApiRequest, NextApiResponse]
      | []
  ) {
    return getServerSession(...args, authOptions);
  }