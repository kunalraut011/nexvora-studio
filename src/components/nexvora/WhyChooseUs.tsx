'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Star, Smartphone, Search, Shield, Settings, Sliders, HeartHandshake } from 'lucide-react';

export function WhyChooseUs() {
  const reasons = [
    { title: 'Fast Delivery', icon: <Zap size={24} />, desc: 'Get your website live in just 48 hours without compromising quality.' },
    { title: 'Premium Design', icon: <Star size={24} />, desc: 'Custom, Awwwards-winning designs that make you stand out.' },
    { title: 'Responsive', icon: <Smartphone size={24} />, desc: 'Perfect flawless layout on mobile, tablet, and desktop.' },
    { title: 'SEO Ready', icon: <Search size={24} />, desc: 'Built-in SEO best practices to rank higher on Google.' },
    { title: 'Secure', icon: <Shield size={24} />, desc: 'Enterprise-grade security to protect your business and customers.' },
    { title: 'Modern Animations', icon: <Sliders size={24} />, desc: 'Smooth interactions and GSAP-style animations that wow visitors.' },
    { title: 'Easy Management', icon: <Settings size={24} />, desc: 'Simple dashboard to manage your content without coding.' },
    { title: 'Lifetime Support', icon: <HeartHandshake size={24} />, desc: 'We are always here to help you grow your digital presence.' }
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '16px' }}>Why <span className="text-gradient">Choose Us</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto', fontSize: '18px' }}>
            We don&apos;t just build websites. We build digital experiences that drive growth and build trust.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '24px' 
        }}>
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel"
              style={{
                padding: '40px 30px',
                position: 'relative',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 242, 254, 0.1)' }}
            >
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: 'var(--primary)' }}>
                {reason.icon}
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>{reason.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.6 }}>
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .why-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.08);
          border-color: rgba(139, 92, 246, 0.4);
        }
        .why-card:hover .why-icon {
          color: white;
          background: var(--accent);
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>
    </section>
  );
}
