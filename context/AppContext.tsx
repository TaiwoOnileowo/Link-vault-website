// @ts-nocheck
"use client";
// import { AppContextType } from "@/types";
import React, { useState, createContext, useContext } from "react";

const Context = createContext();

export const AppContext: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [referenceId, setReferenceId] = useState("");
  console.log("referenceId", referenceId);
  return (
    <Context.Provider
      value={{
        referenceId,
        setReferenceId,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
