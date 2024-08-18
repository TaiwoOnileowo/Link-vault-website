"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import useGetCountry from "@/hooks/useGetCountry";
const EnterDetails = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pay = searchParams!.get("pay");
  console.log(pay);
  const { getPricingBasedOnLocation } = useGetCountry();
  const getPlan = () => {
    if (pay === "monthly") {
      return {
        price: getPricingBasedOnLocation("1.2"),
        plan: "PLN_xlqts3wsmhzzcvt",
      };
    } else if (pay === "biannually") {
      return {
        price: getPricingBasedOnLocation("5.00"),
        plan: "PLN_jqch3zo8kmn9hkr",
      };
    } else if (pay === "annually") {
      return {
        price: getPricingBasedOnLocation("8.50"),
        plan: "PLN_z8ywsqmgehegx0s",
      };
    } else {
      return {
        price: getPricingBasedOnLocation("5.00"),
        plan: "PLN_jqch3zo8kmn9hkr",
      };
    }
  };
  const handleSubscribe = async () => {
    const { price, plan } = getPlan();
    console.log(price, plan);
    setError("");
    if (!email || !name) {
      setError("Please fill in all fields.");
      return;
    } else if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    const response = await fetch("/api/payments/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Number(price),
        callback_url: `https://www.linkvaultapp.com/verify`,
        plan: plan,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      router.push(data.authorization_url);
    } else {
      setError("Payment initialization failed. Please try again.");
      console.log(data);
      throw new Error("Payment initialization failed");
    }
  };

  return (
    <>
      <div className=" flex flex-col gap-4 w-[350px]">
        <h1 className="font-bold text-center text-2xl mb-2">Enter Details</h1>

        <Input
          id="name"
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
        />
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>

      <div className="w-full flex justify-end">
        <button
          onClick={handleSubscribe}
          className="bg-primary-2 text-white rounded-2xl px-3  py-2 inline-flex items-center gap-2"
        >
          Proceed <FaArrowRight />
        </button>
      </div>
    </>
  );
};

export default EnterDetails;
