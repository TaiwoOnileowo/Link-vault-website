"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

const textArray = [
  {
    mainText: "Link Vault helps you easily save and access your links.",
    subText: "Keeps your browser clean",
  },
  {
    mainText: "Easily create folders to organize your links.",
    subText: "Keep your links organized",
  },
  {
    mainText: "Directly add links from your browser.",
    subText: "Just right-click and save",
  },
  {
    mainText: "Easily search and find your saved links.",
    subText: "Find that link in seconds",
  },
  {
    mainText: "You can add folder icons to your folders.",
    subText: "Give it some style",
  },
  // Add more text objects as needed
];

const AuthPageRight = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="w-[45%]">
      <AuroraBackground>
        {textArray.map((_, i) => {
          if (i !== index) return null;
          return (
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              key={i}
              className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="relative flex flex-col gap-4 items-center justify-center px-4"
                >
                  <div className="text-2xl md:text-6xl font-bold  text-center">
                    {textArray[i].mainText}
                  </div>
                  <div className="font-extralight text-sm md:text-3xl  py-4">
                    {textArray[i].subText}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </AuroraBackground>
    </div>
  );
};

export default AuthPageRight;
