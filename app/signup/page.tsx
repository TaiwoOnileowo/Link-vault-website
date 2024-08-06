"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Success from "@/components/Success";
import Left from "@/components/AuthPageLeft";
import Right from "@/components/AuthPageRight";

const SignUp = () => {
  const { data: session, status } = useSession();
  console.log("session", session);
  useEffect(() => {
    if (session) {
      Cookies.set("session", JSON.stringify(session), {
        expires: 1, // 1 day
        secure: process.env.NODE_ENV === "production", // Ensure secure in production
        // sameSite: "lax",
        path: "/",
        domain: "https://linkvaultapp.vercel.app",
      });
    }
  }, [session]);

  if (status === "loading") return null;
  return (
    <div className="flex bg-black-100">
      {status === "authenticated" ? <Success /> : <Left />}
      <Right />
    </div>
  );
};

export default SignUp;
