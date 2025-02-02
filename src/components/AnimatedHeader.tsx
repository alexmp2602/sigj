"use client";

import { motion } from "framer-motion";

import { ReactNode } from "react";

interface AnimatedHeaderProps {
  children: ReactNode;
  className?: string;
  variant?: "h1" | "p";
}

export function AnimatedHeader({
  children,
  className,
  variant = "h1",
}: AnimatedHeaderProps) {
  const Component = variant === "h1" ? motion.h1 : motion.p;
  const animationProps =
    variant === "h1"
      ? {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
        }
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
        };

  return (
    <Component {...animationProps} className={className}>
      {children}
    </Component>
  );
}
