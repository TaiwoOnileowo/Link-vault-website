"use client";

import React from "react";
import Right from "@/components/AuthPageRight";
import Left from "@/components/AuthPageLeft";
import Success from "@/components/Success";
import GetSession from "@/lib/getSession";
const SignUp = () => {
 const { status, session } = GetSession();
 console.log(session, status);
  console.log(status);
  
  if (status === "loading") return null;
  return (
    <div className="flex bg-black-100">
      {status === "authenticated" ? <Success /> : <Left />}
      <Right />
    </div>
  );
};

export default SignUp;
