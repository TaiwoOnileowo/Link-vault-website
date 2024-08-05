import { auth } from "@/auth";
import Google from "next-auth/providers/google";
export const authOptions = {
  secret: process.env.AUTH_SECRET, 
  providers: [
    Google
  ],
  // Any other options you have
};
