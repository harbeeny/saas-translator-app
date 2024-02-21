import { authOptions } from "@/auth"
import NextAuth from "next-auth"
import type { Adapter } from "next-auth/adapters"


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

