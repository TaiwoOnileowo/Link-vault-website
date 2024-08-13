
import React from "react";
import { Features } from "@/types";
import MappedFeatures from "./MappedFeatures";

const CoreFeatures: React.FC<{
  setShowMoreFeatures: React.Dispatch<React.SetStateAction<boolean>>;
  data: Features[];
  showMoreFeatures: boolean;
  isMore?: boolean;
}> = ({ setShowMoreFeatures, data, showMoreFeatures, isMore }) => {
 
  return (
    <div
      id="features"
      className="relative w-full flex flex-col   text-black items-center justify-center"
    >
      <MappedFeatures data={data} isMore={isMore} />
      {!showMoreFeatures && (
        <a href="#more-features">
          <button
            className="text-black mt-16 border-primary-2 button-hover px-12 py-4 w-[200px] border"
            onClick={() => setShowMoreFeatures(true)}
          >
            Load More
          </button>
        </a>
      )}
    </div>
  );
};

export default CoreFeatures;
