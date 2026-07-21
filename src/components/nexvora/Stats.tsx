'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatItem = ({ endValue, suffix, label, delay, prefix = '' }: { endValue: number; suffix: string; label: string; delay: number; prefix?: string }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = endValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= endValue) {
          setValue(endValue);
          clearInterval(timer);
        } else {
          setValue(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, endValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay }}
      className="glass-panel"
      style={{
        padding: '40px 24px',
        textAlign: 'center',
        flex: '1 1 200px',
        position: 'relative',
        overflow: 'hidden'
      }}
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 242, 254, 0.2)' }}
    >
      <div style={{
        position: 'absolute',
        top: '-50%', left: '-50%', width: '200%', height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
        opacity: 0,
        transition: 'opacity 0.3s ease'
      }} className="hover-glow" />
      
      <div style={{ fontSize: '48px', fontWeight: 800, marginBottom: '8px', fontFamily: 'var(--font-sora)' }} className="text-gradient">
        {prefix}{value}{suffix}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
        {label}
      </div>

      <style>{`
        .glass-panel:hover .hover-glow { opacity: 1; }
      `}</style>
    </motion.div>
  );
};

export function Stats() {
  return (
    <section>
      <div className="container" style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <StatItem endValue={48} suffix=" Hours" label="Average Delivery" delay={0.1} />
        <StatItem endValue={8} suffix="+" label="Projects Completed" delay={0.2} />
        <StatItem endValue={100} suffix="%" label="Client Satisfaction" delay={0.3} />
        <StatItem endValue={24} suffix="/7" label="Support" delay={0.4} />
      </div>
    </section>
  );
}
