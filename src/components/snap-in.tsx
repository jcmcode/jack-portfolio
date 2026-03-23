"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SnapInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function SnapIn({ children, delay = 0, className }: SnapInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
