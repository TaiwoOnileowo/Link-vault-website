"use client";
import Image from "next/image";
import React from "react";
import paystack from "@/public/paystack.svg";
import paypal from "@/public/paypal.svg";
import icon from "@/public/icon.png";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
const PricingOptions = () => {
  const searchParams = useSearchParams();
  const pay = searchParams!.get("pay");
  console.log(pay);
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <Image src={icon} width={50} alt="Link Vault" />
      </div>
      <h1 className="text-2xl font-bold">Choose a payment option</h1>
      <Link
        href={`/premium/enterdetails?pay=${pay}`}
        className="  w-full hover:bg-white-100 p-6 rounded-2xl"
      >
        <button className=" inline-flex  gap-4 items-center justify-center">
          <span>
            <Image src={paystack} alt="Paystack" width={30} height={30} />
          </span>
          Pay with Paystack
        </button>
      </Link>
      <Link
        href={`/premium/enterdetails?pay=${pay}`}
        className="  w-full hover:bg-white-100 p-6 rounded-2xl"
      >
        <button className=" inline-flex  gap-4 items-center justify-center">
          {" "}
          <Image src={paypal} alt="Paypal" width={40} height={40} />
          Pay with Paypal
        </button>
      </Link>
    </>
  );
};

export default PricingOptions;
