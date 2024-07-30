import React from "react";
import ClickToPin from "./ClickToPin";
import GetStarted from "./GetStarted";

const Welcome = () => {
  return (
    <div className="bg-welcome-bg h-screen overflow-hidden bg-cover bg-no-repeat p-16 py-4">
      <ClickToPin />
      <GetStarted />
    </div>
  );
};

export default Welcome;
