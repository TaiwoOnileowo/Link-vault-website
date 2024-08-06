"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const VerifyPayment = () => {
  const searchParams = useSearchParams();
  const reference = searchParams!.get("reference");
  const [text, setText] = useState("");

  useEffect(() => {
    if (reference) {
      const verifyPayment = async () => {
        const response = await fetch(
          `/api/payments/verify?reference=${reference}`
        );
        const data = await response.json();
        if (data.status === "success") {
          console.log("Payment verified:", data);
          setText("Payment verified");
          // handle successful payment verification (e.g., update user subscription status)
        } else {
          console.error("Payment verification failed:", data);
        }
      };

      verifyPayment();
    }
  }, [reference]);

  return (
    <div>
      <h1>{text ? text : "Verifying Payment..."}</h1>
    </div>
  );
};

const SuspendedVerifyPayment = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <VerifyPayment />
  </Suspense>
);

export default SuspendedVerifyPayment;
