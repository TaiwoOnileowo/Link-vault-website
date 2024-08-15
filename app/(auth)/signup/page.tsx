"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Success from "@/components/Success";
import Left from "@/components/AuthPageLeft";
import Right from "@/components/AuthPageRight";
import { postSession } from "@/lib/postSession";
const SignUp = () => {
  const { data: session, status } = useSession();
  console.log("session", session);

  useEffect(() => {
    if (status === "authenticated" && session) {
      console.log("session", session);
      postSession( session );
    }
  }, [status, session]);
  if (status === "loading") return <p>Hey</p>;
  return (
    <div className="flex bg-black-100 h-screen overflow-hidden">
      {status === "authenticated" ? <Success /> : <Left />}
      <Right />
    </div>
  );
};

export default SignUp;
