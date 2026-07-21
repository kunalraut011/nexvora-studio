'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function TrustedLogos() {
  const logos = [
    'Google', 'Microsoft', 'Adobe', 'Figma', 'GitHub', 
    'Shopify', 'Vercel', 'Stripe', 'Notion', 'Slack'
  ];

  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>
        Trusted by ambitious brands
      </div>
      
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative', width: '100%' }}>
        {/* Fading Edges */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '150px', height: '100%', background: 'linear-gradient(to right, var(--background), transparent)', zIndex: 10 }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '100%', background: 'linear-gradient(to left, var(--background), transparent)', zIndex: 10 }} />
        
        <motion.div
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
          style={{ display: 'inline-flex', gap: '80px', paddingRight: '80px' }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={index} 
              className="logo-item"
              style={{
                fontSize: '28px',
                fontWeight: 800,
                color: 'rgba(255,255,255,0.3)',
                fontFamily: 'var(--font-sora)',
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}
            >
              {logo}
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .logo-item:hover {
          color: white !important;
          transform: scale(1.1);
          text-shadow: 0 0 20px rgba(0, 242, 254, 0.5);
        }
      `}</style>
    </section>
  );
}
