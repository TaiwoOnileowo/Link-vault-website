"use client";

import React, { useEffect } from "react";
import Right from "@/components/AuthPageRight";
import Left from "@/components/AuthPageLeft";
import Success from "@/components/Success";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Login = () => {
  const { status, data: session } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login"); // Redirect to login if unauthenticated
    }
  }, [status, router]);

  if (status === "loading") return null;

  return (
    <div className="flex bg-black-100">
      <Right />
      {status === "authenticated" ? <Success /> : <Left isLogin={true} />}
    </div>
  );
};

export default Login;
