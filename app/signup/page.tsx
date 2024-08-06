// @ts-nocheck
"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Success from "@/components/Success";
import Left from "@/components/AuthPageLeft";
import Right from "@/components/AuthPageRight";
const SignUp = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("sessiondffff", session);
    if (session) {
      console.log("session", session);
      Cookies.set("session", JSON.stringify(session), {
        expires: 1,
        secure: true,
        sameSite: "Lax",
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
