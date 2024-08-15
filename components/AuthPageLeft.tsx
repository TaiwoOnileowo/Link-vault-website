import React from "react";
import SignUpForm from "../app/(auth)/signup/SignUpForm";

const AuthPageLeft = ({ isLogin }: { isLogin?: boolean }) => {
  return (
    <div className="h-screen justify-center flex items-center w-[55%]">
      <div className="max-w-md w-full  mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white">
        <h2 className="font-bold text-xl text-neutral-800 ">
          {isLogin ? "Welcome Back" : " Welcome to Link Vault"}
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 ">
          {isLogin ? "Log in" : "Sign Up"} to sync your links across devices and
          browsers.
        </p>
        <SignUpForm isLogin={isLogin}/>
      </div>
    </div>
  );
};
export default AuthPageLeft;
