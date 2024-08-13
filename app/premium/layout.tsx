import React from "react";

const layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="bg-white h-screen flex items-center justify-center ">
      <div className="border flex flex-col items-start justify-center gap-6 border-primary-2 rounded-2xl p-10">
        {children}
      </div>
    </div>
  );
};

export default layout;
