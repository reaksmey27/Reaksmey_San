import { motion } from "motion/react";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) {
        setIsHovering(false);
        return;
      }

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  // Use a slight generic styling offset
  const variants = {
    default: {
      x: x - 16,
      y: y - 16,
      height: 32,
      width: 32,
      backgroundColor: "transparent",
      border: "1px solid rgba(var(--cursor-color-rgb), 0.45)",
      transition: {
        type: "spring",
        stiffness: 1000,
        damping: 50,
        mass: 0.1
      }
    },
    hover: {
      x: x - 24,
      y: y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(var(--cursor-color-rgb), 0.12)",
      border: "1px solid rgba(var(--cursor-color-rgb), 0.8)",
      backdropFilter: "blur(4px)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.1
      }
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 hidden md:block"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--color-foreground)] rounded-full pointer-events-none z-50 hidden md:block"
        animate={{
          x: x - 4,
          y: y - 4,
          transition: {
            type: "spring",
            stiffness: 2000,
            damping: 100,
            mass: 0.05
          }
        }}
      />
    </>
  );
}
