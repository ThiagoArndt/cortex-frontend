import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";
const animationConfiguration = {
  initial: { opacity: 0.3 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

interface TransitionsInterface extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export const Transitions = ({ children, ...props }: TransitionsInterface) => {
  return (
    <motion.div
      {...props}
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
