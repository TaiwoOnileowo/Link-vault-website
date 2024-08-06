// "use client";
import React from "react";
// import { RiLinksFill } from "react-icons/ri";
import Heading from "./Heading";
const About = () => {
  return (
    <div className="flex flex-col items-center h-screen w-full justify-center gap-8 py-16 pt-48 px-4 text-light-text">
      <Heading text="Introducing Link Vault" />
      <div
        className={` background-transition max-w-[600px] md:max-w-[700px]  text-muted-text text-opacity-50 text-center space-y-4  p-8 about-text-container shadow-lg`}
      >
        <p className="text-sm xs:text-base ss:text-lg md:text-xl text-white text-fade-in opacity-0">
          <span className="gradient-text text-[20px] text-transparent font-bold pr-2">
            We know the struggle.
          </span>
          Managing countless links can be overwhelming and inefficient.
          Chrome&apos;s bookmarks and history don&apos;t work for you.
          Favoriting tabs makes your Chrome cluttered. You need a faster and
          more efficient way.
        </p>
        <p className="gradient-text md:text-[20px] text-base xs:text-lg  text-fade-in opacity-0 ss:text-xl md:text-2xl text-white  font-bold">
          That&apos;s where Link Vault comes in
        </p>
      </div>
    </div>
  );
};

export default About;
