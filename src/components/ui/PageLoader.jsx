import { motion } from "motion/react";
import { SITE_NAME } from "../../config/site";

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black pointer-events-none"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-4xl font-display font-light tracking-widest text-white md:text-6xl"
      >
        {SITE_NAME}
        <span className="text-white/30">.</span>
      </motion.h1>

      <div className="h-1 w-[200px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="h-full w-full bg-white"
        />
      </div>
    </motion.div>
  );
}
