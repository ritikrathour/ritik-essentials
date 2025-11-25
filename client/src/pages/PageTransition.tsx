import React, { ReactNode } from "react";
import { motion } from "motion/react";
interface IPageTransition {
  children: ReactNode;
  variants: "scale" | "fade" | "slideUp" | "slideLeft";
}
const PageTransition: React.FC<IPageTransition> = ({ children, variants }) => {
  const transitionVariants = {
    fade: {
      intial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      intial: { y: 50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -50, opacity: 0 },
    },
    slideLeft: {
      intial: { x: 100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -100, opacity: 0 },
    },
    scale: {
      intial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.1, opacity: 0 },
    },
  };
  return (
    <>
      <motion.div
        initial="intial"
        animate="animate"
        exit="exit"
        variants={transitionVariants[variants]}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
};
export default PageTransition;
