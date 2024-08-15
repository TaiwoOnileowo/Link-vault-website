"use client";
import React from "react";
import Link from "next/link";
import useGetCountry from "@/hooks/useGetCountry";
const PayPremiumButtons = () => {
  const { getPricingBasedOnLocation } = useGetCountry();
  return (
    <div className="w-full flex gap-4 z-[10] items-center mt-6 text-sm">
      <div className="flex flex-col z-[10] items-center gap-4">
        <Link href="/premium/paymentoptions?pay=monthly">
          <button className="border border-primary-3  hover:bg-primary-3 cursor-pointer p-3 py-2 rounded-full">
            Pay Monthly
          </button>
        </Link>
        <p className="font-bold text-xl">{getPricingBasedOnLocation("1.2")}</p>
      </div>
      <div className="flex flex-col z-[10] items-center gap-4">
        <Link href="/premium/paymentoptions?pay=biannually">
          <button className="bg-text-gradient-1 p-3 rounded-full cursor-pointer py-2 hover:border-primary-3 hover:border">
            Pay Biannually
          </button>
        </Link>
        <p className="font-bold text-xl">{getPricingBasedOnLocation("5.00")}</p>
      </div>
      <div className="flex flex-col z-[10] items-center gap-4">
        <Link href="/premium/paymentoptions?pay=annually">
          <button className="border border-primary-3 hover:bg-primary-3 cursor-pointer p-3 py-2 rounded-full">
            Pay Annually
          </button>
        </Link>
        <p className="font-bold text-xl">{getPricingBasedOnLocation("8.50")}</p>
      </div>
    </div>
  );
};

export default PayPremiumButtons;
