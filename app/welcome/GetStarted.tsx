"use client";
import React, { useState } from "react";
import BackgroundGradient from "@/components/ui/BackgroundGradient";
import PinLinkVault from "./PinLinkVault";
import GoToSignUp from "./GoToSignUp";
const GetStarted = () => {
  const [showGoToSignUp, setShowGoToSignUp] = useState<Boolean>(false);
  const handleClick = () => {
    setShowGoToSignUp(true);
  };
  return (
    <div className="w-full h-full items-start py-16 justify-center flex">
      <BackgroundGradient className="rounded-[22px] max-w-xl p-4 sm:p-8 bg-white">
        {showGoToSignUp ? (
          <GoToSignUp />
        ) : (
          <PinLinkVault handleClick={handleClick} />
        )}
      </BackgroundGradient>
    </div>
  );
};

export default GetStarted;
