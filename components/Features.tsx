
"use client";
import React, { useState } from "react";
import CoreFeatures from "./CoreFeatures";

import { features, more_features } from "@/data";
import Heading from "./Heading";
const Features = () => {
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);

  return (
    <div
      className="bg-white flex flex-col items-center py-10
    "
    >
      <Heading text="Core Features" color={true} />
      <CoreFeatures
        setShowMoreFeatures={setShowMoreFeatures}
        data={features}
        showMoreFeatures={showMoreFeatures}
      />
      {showMoreFeatures && (
        <CoreFeatures
          setShowMoreFeatures={setShowMoreFeatures}
          data={more_features}
          showMoreFeatures={showMoreFeatures}
          isMore={true}
        />
      )}
    </div>
  );
};

export default Features;
