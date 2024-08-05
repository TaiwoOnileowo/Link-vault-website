"use server";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const googleSignIn = async () => {
  await signIn("google");
};

export const logOut = async () => {
  console.log("logging out");
  await signOut();

};
export const resendSignIn = async (formData: { email: string }) => {
  await signIn("resend", formData);
};
