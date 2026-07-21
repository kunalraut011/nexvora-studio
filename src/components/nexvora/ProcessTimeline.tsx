'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function ProcessTimeline() {
  const steps = [
    { num: '01', title: 'Discovery & Strategy', desc: 'We analyze your brand, competitors, and goals to craft a winning digital strategy.' },
    { num: '02', title: 'UI/UX Design', desc: 'Creating wireframes and stunning visual designs that align with your premium brand identity.' },
    { num: '03', title: 'Development', desc: 'Building your website with modern, blazing-fast technologies and smooth animations.' },
    { num: '04', title: 'Launch & Grow', desc: 'Rigorous testing, SEO optimization, and a flawless launch to start driving conversions.' }
  ];

  return (
    <section>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '24px' }}
          >
            Our Proven <span className="text-gradient">Process</span>
          </motion.h2>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Timeline Line */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '2px', background: 'rgba(255,255,255,0.1)', transform: 'translateX(-50%)' }} className="timeline-line" />
          
          {steps.map((step, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '60px',
              flexDirection: i % 2 === 0 ? 'row' : 'row-reverse'
            }} className="timeline-row">
              
              <div className="glass-panel" style={{
                flex: 1,
                padding: '40px',
                textAlign: i % 2 === 0 ? 'right' : 'left',
                position: 'relative',
                transition: 'transform 0.4s ease'
              }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>STEP {step.num}</div>
                <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>

              <div style={{ width: '40px', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
                <div style={{ 
                  width: '20px', height: '20px', borderRadius: '50%', 
                  background: 'var(--background)', border: '4px solid var(--primary)',
                  boxShadow: '0 0 20px rgba(0,242,254,0.5)'
                }} />
              </div>

              <div style={{ flex: 1 }} className="timeline-spacer" />
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .timeline-line { left: 20px !important; }
          .timeline-row { flexDirection: column !important; alignItems: flex-start !important; gap: 24px; padding-left: 40px; }
          .timeline-row > div:nth-child(2) { position: absolute; left: 0; }
          .timeline-spacer { display: none; }
          .glass-panel { textAlign: left !important; }
        }
      `}</style>
    </section>
  );
}
