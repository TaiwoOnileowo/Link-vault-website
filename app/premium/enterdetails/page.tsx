import EnterDetails from "@/components/EnterDetails";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnterDetails />
    </Suspense>
  );
};

export default Page;
