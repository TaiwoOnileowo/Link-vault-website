"use client";

import React from "react";
import Right from "@/components/AuthPageRight";
import Left from "@/components/AuthPageLeft";
import Success from "@/components/Success";
import { useSession } from "next-auth/react";

const Login = () => {
  const { status, data: session } = useSession();
  console.log("session", session);

  if (status === "loading") return null;

  return (
    <div className="flex bg-black-100">
      <Right />
      {status === "authenticated" ? <Success /> : <Left isLogin={true} />}
    </div>
  );
};

export default Login;
