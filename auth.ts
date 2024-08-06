import NextAuth, { Session as NextAuthSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import clientPromise from "./lib/mongodb";
import { JWT } from "next-auth/jwt";


export interface DefaultSession {
  user?: User
  expires: ISODateString
}
type ISODateString = string
export interface Session extends DefaultSession {}


export interface User {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: true,
  providers: [
    Credentials({
      credentials: {
        first_name: { label: "First Name", type: "text" },
        last_name: { label: "Last Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, credentials.password);

        if (!user) {
          throw new Error("User not found.");
        }

        return user;
      },
    }),
    Google,
    Resend,
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.id) {
        session.user!.id = token.id as string;
      }
      return session;
    },
  },
});
