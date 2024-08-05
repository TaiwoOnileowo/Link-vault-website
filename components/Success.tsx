import React from "react";
import BackgroundGradient from "./ui/BackgroundGradient";
import Lottie from "react-lottie";
import { defaultOptions } from "@/lib/constants";
const Success = () => {
  return (
    <div className="w-[55%] h-screen flex items-center justify-center">
      <BackgroundGradient
        className="rounded-[22px] relative max-w-xl p-4 sm:p-8 bg-white"
        animate={false}
      >
        <div className="absolute bottom-0 right-0">
          <Lottie options={defaultOptions} height={200} width={300} />
        </div>
        <h1 className="font-bold text-2xl text-neutral-800 text-center">
          Sign in successful!🎉
        </h1>
        <p className="text-neutral-600 text-sm max-w-sm mt-2  text-center">
          Your links are now synced across devices and browsers.
        </p>
      </BackgroundGradient>
    </div>
  );
};

export default Success;
