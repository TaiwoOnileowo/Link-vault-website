import PaymentOptions from "@/components/PaymentOptions";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentOptions />
    </Suspense>
  );
};

export default Page;
