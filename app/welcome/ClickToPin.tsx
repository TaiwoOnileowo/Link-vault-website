import React from "react";
import arrow from "./arrow.svg";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import Image from "next/image";
const ClickToPin = () => {
  return (
    <div className="w-full flex flex-col items-end">
      <div className="mx-16">
        <Image src={arrow} alt="Arrow" />
      </div>
      <div className="mt-4 w-full justify-end flex">
        <p className="flex text-gray-800 gap-2 items-center font-medium">
          Click <IoExtensionPuzzleOutline />
          to pin Link Vault
        </p>
      </div>
    </div>
  );
};

export default ClickToPin;
