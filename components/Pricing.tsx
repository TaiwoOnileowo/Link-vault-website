"use client";
import React, { useState } from "react";
import Heading from "./Heading";
import { WobbleCard } from "./ui/WobbleCard";
import Image from "next/image";
import { pricingFeatures } from "@/data";
import LinkSvg from "./LinkSvg";
import Link from "next/link";
const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<"premium" | "free">(
    "premium"
  );
  return (
    <div className="w-full flex items-center justify-center flex-col py-24 overflow-hidden min-h-screen text-white">
      <Heading text="Pricing Plans" />
      <p>Gain access to even better link management features</p>
      <div className=" mt-8 gap-5 flex">
        <button
          className={`${
            selectedPlan === "free"
              ? " bg-primary-2 "
              : "hover:bg-primary-2/10"
          } px-4 py-2 rounded-2xl`}
          onClick={() => setSelectedPlan("free")}
        >
          Free
        </button>
        <button
          className={`${
            selectedPlan === "premium"
              ? " bg-primary-2 "
              : "hover:bg-primary-2/10"
          } px-4 py-2 rounded-2xl`}
          onClick={() => setSelectedPlan("premium")}
        >
          Premium
        </button>
      </div>
      <WobbleCard containerClassName="col-span-1 mt-12 lg:col-span-3  w-1/2 ">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            {pricingFeatures[selectedPlan].title}
          </h2>
          <ul className="mt-4 max-w-[26rem] text-left  text-sm/6 text-neutral-200">
            {pricingFeatures[selectedPlan].features.map((feature, index) => (
              <li key={index} className="flex items-center mt-2">
                <LinkSvg showGradient={false} color="#40E8F0" />
                <span className="ml-2">{feature}</span>
              </li>
            ))}
          </ul>
          {selectedPlan === "premium" && (
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
          )}
        </div>
        <Image
          src="/innovation.webp"
          width={400}
          height={400}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
};

export default Pricing;
