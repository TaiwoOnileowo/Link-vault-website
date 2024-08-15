"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  console.log(isInView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="h-screen text-white"
    >
      Your content here
    </motion.div>
  );
};

export default ScrollAnimation;
