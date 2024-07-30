import React from "react";
import Lottie from "react-lottie";
import animationData from "../../data/confetti.json";
import Link from "next/link";
const GoToSignUp = () => {
  const defaultOptions = {
    loop: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="text-gray-800 h-full w-full flex items-center justify-center flex-col">
      <div className="absolute -bottom-0 right-0">
        <Lottie options={defaultOptions} height={250} width={400} />
      </div>
      <h3 className="text-center text-sm mb-1 font-medium">
        Welcome to Link Vault!
      </h3>
      <h1 className="text-2xl font-bold">Start saving your links with ease</h1>
      <div className="flex gap-6 mt-8 z-10 justify-center">
        <Link
          href="/login"
          className="bg-blue-200 hover:bg-transparent hover:text-blue-200 hover:border-blue-200 border text-white px-8 py-2 rounded-full font-semibold hover:opacity-90 transition duration-300"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="border text-blue-200 border-blue-200 px-8 rounded-full py-2 hover:bg-blue-200 hover:text-white transition duration-300"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default GoToSignUp;
