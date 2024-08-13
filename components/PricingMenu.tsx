import React from "react";

const PricingMenu = ({
    selectedPlan,
    setSelectedPlan,
    }: {
    selectedPlan: string;
    setSelectedPlan: React.Dispatch<React.SetStateAction<"premium" | "free">>;
}) => {
  return (
    <div className=" mt-8 gap-5 flex">
      <button
        className={`${
          selectedPlan === "free" ? " bg-primary-2 " : "hover:bg-primary-2/10"
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
  );
};

export default PricingMenu;
