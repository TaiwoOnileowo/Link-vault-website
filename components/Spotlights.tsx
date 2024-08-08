import React from "react";
import { Spotlight } from "./ui/Spotlight";
const Spotlights = () => {
  return (
    <div>
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
        fill="white"
      />
      <Spotlight
        className="top-10 -left-full md:-left-32 h-[80vh] w-[50vw]"
        fill="#5CE4E4"
      />
      <Spotlight className="top-28 left-80 w-[50vw] h-[80vh]" fill="#2B4CF4" />
    </div>
  );
};

export default Spotlights;
