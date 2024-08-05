"use client";
import React, { useState } from "react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { googleSignIn, resendSignIn } from "@/lib/actions";

const SignUpForm = ({ isLogin }: { isLogin?: boolean }) => {
  const [withEmail, setWithEmail] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (withEmail) {
      await resendSignIn({ email });
    } else {
      await googleSignIn();
    }
  };

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4">
        <button
          className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 "
          type="submit"
          // onClick={googleSignIn}
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 " />
          <span className="text-neutral-700 text-sm">
            Google
          </span>
          <BottomGradient />
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />

      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          placeholder="projectmayhem@fc.com"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </LabelInputContainer>

      <button
        className="bg-gradient-to-br relative group/btn from-black  to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
        type="submit"
        onClick={() => setWithEmail(true)}
      >
        {isLogin ? "Log in" : "Sign up"} with email &rarr;
        <BottomGradient />
      </button>

      <p className="text-xs mt-6">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link href={isLogin ? "/signup" : "/login"} className="text-blue-200">
          {isLogin ? "Sign up" : "Log in"}
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
