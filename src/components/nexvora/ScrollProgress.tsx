'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        transformOrigin: '0%',
        background: 'linear-gradient(90deg, var(--secondary), var(--accent))',
        boxShadow: '0 0 15px rgba(139, 92, 246, 0.8)',
        zIndex: 10001,
        scaleX
      }}
    />
  );
}
