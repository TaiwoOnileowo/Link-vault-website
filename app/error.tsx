"use client";
import Link from "next/link";
import React from "react";
import logo from "@/public/icon.png";
import Image from "next/image";
const Error = () => {
  return (
    <div className="flex flex-col items-center p-28 h-screen">
      <div className="bg-red-100 rounded-full w-[150px] h-[150px] flex items-center justify-center text-6xl">
        ❗
      </div>
      <h1 className="mt-12 text-2xl font-bold">Oops...An error occured!</h1>
      <p className="text-center my-4">
        Oops, it looks like we&apos;ve encountered a glitch! <br></br> try again, {" "}
        <Link href="/" className="text-primary-2 underline cursor-pointer">
          refresh
        </Link>{" "}
        or come back later when our tech wizards 🧙‍♂️ have fixed it
      </p>
      <div className="flex gap-3 items-center fixed bottom-6 justify-center">
        <Image src={logo} alt="Link Vault Logo" priority width={40} />
        <h1 className="text-2xl font-bold">Link Vault</h1>
      </div>
    </div>
  );
};

export default Error;
