'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CircularProgress = ({ value, label, color, delay }: { value: number; label: string; color: string; delay: number }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCurrentValue(value);
          clearInterval(timer);
        } else {
          setCurrentValue(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentValue / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, delay }}
      className="glass-panel"
      style={{
        padding: '40px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px',
        flex: '1 1 200px',
        position: 'relative'
      }}
      whileHover={{ y: -10, boxShadow: `0 20px 40px ${color}33` }}
    >
      <div style={{ position: 'relative', width: '140px', height: '140px' }}>
        {/* Background Circle */}
        <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="70" cy="70" r={radius}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="70" cy="70" r={radius}
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        
        {/* Number inside */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-sora)',
          color: 'white'
        }}>
          {currentValue}
        </div>
      </div>
      
      <div style={{ fontSize: '18px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
        {label}
      </div>
    </motion.div>
  );
};

export function Performance() {
  return (
    <section>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '24px' }}
          >
            Engineered For <span className="text-gradient">Speed</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}
          >
            We optimize every single asset to ensure your website loads instantly, resulting in higher rankings and better user experience.
          </motion.p>
        </div>

        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <CircularProgress value={99} label="Performance" color="#00f2fe" delay={0.1} />
          <CircularProgress value={100} label="Accessibility" color="#4facfe" delay={0.2} />
          <CircularProgress value={100} label="Best Practices" color="#8b5cf6" delay={0.3} />
          <CircularProgress value={100} label="SEO" color="#d946ef" delay={0.4} />
        </div>
      </div>
    </section>
  );
}
