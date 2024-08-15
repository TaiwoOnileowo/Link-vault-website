import React from "react";
import { BottomGradient } from "../signup/SignUpForm";
import { logOut } from "@/lib/actions";

const Left = () => {
  const handleLogout = async () => {
    await logOut();

    window.location.href = "/login";
  };

  return (
    <div className="h-screen justify-center flex items-center w-[55%]">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white">
        <h2 className="font-bold text-xl text-neutral-800 ">Logout?</h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 ">
          Your links will no longer be synced across devices and browsers.
        </p>
        <button
          className="bg-gradient-to-br relative mt-8 group/btn from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          onClick={handleLogout}
        >
          Logout &rarr;
          <BottomGradient />
        </button>
      </div>
    </div>
  );
};

export default Left;
