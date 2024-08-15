"use client";

import { useSession } from "next-auth/react";
import Success from "@/components/Success";
import Left from "@/components/AuthPageLeft";
import Right from "@/components/AuthPageRight";

const SignUp = () => {
  const { data: session, status } = useSession();
  console.log("session", session);


  if (status === "loading") return null;
  return (
    <div className="flex bg-black-100">
      {status === "authenticated" ? <Success /> : <Left />}
      <Right />
    </div>
  );
};

export default SignUp;
