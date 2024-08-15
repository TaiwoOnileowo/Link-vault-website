"use client";
import React from "react";
import Right from "@/components/AuthPageRight";
import Left from "./Left";
const LogOut = () => {
  return (
    <div className="bg-black-100 flex">
      <Right />
      <Left />
    </div>
  );
};

export default LogOut;
