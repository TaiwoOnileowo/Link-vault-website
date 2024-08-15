// @ts-nocheck
"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context/AppContext";
const VerifyPayment = () => {
  const searchParams = useSearchParams();
  const reference = searchParams!.get("reference");
  const [text, setText] = useState("");
  const { data: session } = useSession();
  console.log(reference);
const { referenceId, setReferenceId } = useAppContext();

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
          setReferenceId(data.reference)
        } else {
          console.error("Payment verification failed:", data);
          throw new Error("Payment verification failed");
        }
      };

      verifyPayment();
    }
  }, [reference, setReferenceId]);
  console.log("session", session);
  console.log("referenceId", referenceId);
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
