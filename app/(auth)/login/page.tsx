"use client";

import React, { useEffect } from "react";
import Right from "@/components/AuthPageRight";
import Left from "@/components/AuthPageLeft";
import Success from "@/components/Success";
import { useSession } from "next-auth/react";
// import { postSession } from "@/lib/postSession";

const Login = () => {
  const { status, data: session } = useSession();

  // useEffect(() => {
  //   if (status === "authenticated" && session) {
     
  //     postSession(session);
  //   }
  // }, [status, session]);

  if (status === "loading") return <p>Loading...</p>; 

  return (
    <div className="flex bg-black-100">
      <Right />
      {status === "authenticated" ? <Success /> : <Left isLogin={true} />}
    </div>
  );
};

export default Login;
