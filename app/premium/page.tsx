import React from "react";

const Premium = () => {
  const dax = process.env.AUTH_URL
  console.log(dax)
  return (
    <div className="flex gap-8 ">
      <button>PAY MONTHLY</button>
      <button>PAY BIANUUALLY</button>
      <button>PAY ANNUALLY</button>
    </div>
  );
};

export default Premium;
