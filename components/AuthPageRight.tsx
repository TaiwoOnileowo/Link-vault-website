"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

import { signinText } from "@/data";

const AuthPageRight = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % signinText.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[45%] h-screen">
      <AuroraBackground>
        {signinText.map((_, i) => {
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
              className="relative flex flex-col gap-4 h-screen items-center justify-center px-4"
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
                    {signinText[i].mainText}
                  </div>
                  <div className="font-extralight text-sm md:text-3xl  py-4">
                    {signinText[i].subText}
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
