import React from "react";
import Link from "next/link";
const PayPremiumButtons = () => {
  return (
    <div className="w-full flex gap-4 items-center absolute buttom-0 left-0 px-12 my-6 text-sm z-[10]">
      <Link href="/premium/paymentoptions?pay=monthly">
        <button className="border border-primary-3 hover:bg-primary-3 cursor-pointer p-3 py-2 rounded-full">
          Pay Monthly
        </button>
      </Link>
      <Link href="/premium/paymentoptions?pay=biannually">
        <button className="bg-text-gradient-1 p-3 rounded-full cursor-pointer py-2 hover:border-primary-3 hover:border">
          Pay Biannually
        </button>
      </Link>
      <Link href="/premium/paymentoptions?pay=annually">
        <button className="border border-primary-3 hover:bg-primary-3 cursor-pointer p-3 py-2 rounded-full">
          Pay Annually
        </button>
      </Link>
    </div>
  );
};

export default PayPremiumButtons;
