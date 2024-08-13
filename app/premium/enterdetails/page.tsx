"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

const EnterDetails = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(""); // Error state

  const router = useRouter();
  const searchParams = useSearchParams();
  const pay = searchParams!.get("pay");
  console.log(pay);

  const getPlan = () => {
    if (pay === "monthly") {
      return "PLN_xlqts3wsmhzzcvt";
    } else if (pay === "biannually") {
      return "PLN_jqch3zo8kmn9hkr";
    } else if (pay === "annually") {
      return "PLN_z8ywsqmgehegx0s";
    }
  };
  const handleSubscribe = async () => {
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
        amount: 1600,
        callback_url: `https://linkvaultapp.vercel.app/verify`, // Correctly set the callback URL
        plan: getPlan(),
      }),
    });
  
    const data = await response.json();
    console.log(data);
  
    if (response.ok) {
      router.push(data.authorization_url);
    } else {
      setError("Payment initialization failed. Please try again.");
      console.error("Payment initialization failed:", data);
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
