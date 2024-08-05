"use client";
import React from "react";
import { Spotlight } from "./ui/Spotlight";
import Models from "./Test";
import { ReactTyped } from "react-typed";
import { googleSignIn } from "@/lib/actions";
import { signOut } from "@/auth";
const Hero = () => {
  const words = ["Save", "Access", "Organize", "Manage"];
  return (
    <div className=" pb-20 pt-36 flex flex-col h-screen gap-24">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 -left-full md:-left-32 h-[80vh] w-[50vw]"
          fill="#5CE4E4"
        />
        <Spotlight
          className="top-28 left-80 w-[50vw] h-[80vh]"
          fill="#2B4CF4"
        />
      </div>

      <div className="h-screen w-full bg-black-100 bg-grid-white/[0.03]  absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="flex justify-center relative mt-20 z-10">
        <div className="max-w-[89w] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h1 className="text-center text-white font-bold text-[40px] mb-6 md:text-5xl lg:text-6xl">
            <ReactTyped
              typeSpeed={100}
              backSpeed={100}
              loop
              strings={["Save", "Access", "Organize", "Manage"]}
            />{" "}
            Your Links <span className="text-purple">with Ease</span>
          </h1>
          <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#00022E,45%,#1A3558,55%,#00022E)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Download Now
          </button>
          <form
            action={googleSignIn}
          >
            <button type="submit">Sign Out</button>
          </form>
        </div>
      </div>

      <Models />
    </div>
  );
};

export default Hero;
