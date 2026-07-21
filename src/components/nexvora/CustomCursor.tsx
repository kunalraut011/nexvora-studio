'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on fine pointers (desktop)
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      const moveCursor = (e: MouseEvent) => {
        cursorX.set(e.clientX - 10); // Offset by half width
        cursorY.set(e.clientY - 10);
      };

      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const clickable = target.closest('a, button, input, textarea, [role="button"]');
        setIsHovering(!!clickable);
      };

      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseover', handleMouseOver);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mouseover', handleMouseOver);
      };
    }
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer Glowing Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 242, 254, 0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          backgroundColor: isHovering ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
          boxShadow: isHovering ? '0 0 15px rgba(0, 242, 254, 0.4)' : 'none',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 2.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      {/* Inner Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          width: '6px',
          height: '6px',
          margin: '7px', // center inside 20x20
          borderRadius: '50%',
          backgroundColor: '#00f2fe',
          pointerEvents: 'none',
          zIndex: 10000,
        }}
        animate={{
          scale: isHovering ? 0 : 1, // disappear when hovering clickable elements
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
