"use client";
import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { FaLocationArrow } from "react-icons/fa";
import { FlipWords } from "./ui/FlipWords";
import Models from "./Test";
import { BackgroundBeams } from "./ui/BackgroundBeams";
import { ReactTyped } from "react-typed";

const Hero = () => {
  const words = ["Save", "Access", "Organize", "Manage"];
  return (
    <div className=" p-36 px-24 overflow-hidden flex gap-6 justify-center  h-screen ">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white" // primary.1
        />
        <Spotlight
          className="top-10 -left-full md:-left-32 h-[80vh] w-[50vw]"
          fill="#5CE4E4" // primary.2
        />
        <Spotlight
          className="top-28 left-80 w-[50vw] h-[80vh]"
          fill="#2B4CF4" // primary.3
        />
      </div>

      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="flex justify-center relative z-10 w-[70%] overflow-clip">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl min-w-[80%] font-bold tracking-wider">
            <ReactTyped
              typeSpeed={100}
              backSpeed={100}
              loop
              strings={["Save", "Access", "Organize", "Manage"]}
            />{" "}
            Your Links with Ease
          </h1>
        </div>
      </div>
      {/* <BackgroundBeams /> */}
      <Models />
    </div>
  );
};

export default Hero;
