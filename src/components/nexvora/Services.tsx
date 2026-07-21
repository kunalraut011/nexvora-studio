'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, LayoutTemplate, Briefcase, Utensils, HeartPulse, Dumbbell, Building, RefreshCw, PenTool, Search, ArrowRight } from 'lucide-react';

const services = [
  { title: 'Corporate Websites', icon: <Building size={40} />, desc: 'Build trust and authority with a professional online presence.' },
  { title: 'SaaS / Tech Startups', icon: <Monitor size={40} />, desc: 'High-converting landing pages that explain complex products simply.' },
  { title: 'Portfolio / Creators', icon: <Briefcase size={40} />, desc: 'Showcase your work with stunning, interactive galleries.' },
  { title: 'E-Commerce / Retail', icon: <LayoutTemplate size={40} />, desc: 'Beautiful storefronts designed to maximize your sales.' },
  { title: 'Healthcare / Clinics', icon: <HeartPulse size={40} />, desc: 'Clean, trustworthy designs that put patients first.' },
  { title: 'Fitness / Gyms', icon: <Dumbbell size={40} />, desc: 'High-energy websites that drive memberships.' },
  { title: 'Restaurants / Cafes', icon: <Utensils size={40} />, desc: 'Mouth-watering menus and easy reservation systems.' },
  { title: 'Website Redesign', icon: <RefreshCw size={40} />, desc: 'Modernize your outdated website with a fresh, premium look.' },
  { title: 'UI / UX Design', icon: <PenTool size={40} />, desc: 'User-centric designs that ensure seamless experiences.' },
  { title: 'SEO Optimization', icon: <Search size={40} />, desc: 'Rank higher on Google and attract organic traffic.' }
];

export function Services() {
  return (
    <section id="services">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '24px' }}
          >
            Premium Solutions For <span className="text-gradient">Every Industry</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}
          >
            We don&apos;t use templates. Every website is custom-designed and engineered to dominate your specific market.
          </motion.p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="service-card glass-panel"
              style={{
                padding: '40px 30px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
              }}
            >
              {/* Gradient Border Overlay on Hover */}
              <div className="border-glow" style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: '24px',
                padding: '2px',
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                opacity: 0,
                transition: 'opacity 0.4s ease'
              }} />
              
              <div className="icon-wrapper text-gradient" style={{ marginBottom: '24px', transition: 'transform 0.4s ease' }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{service.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '24px' }}>{service.desc}</p>
              
              <div className="arrow-btn" style={{ 
                display: 'flex', alignItems: 'center', gap: '8px', 
                color: 'var(--primary)', fontWeight: 600, fontSize: '14px',
                opacity: 0.7, transition: 'all 0.3s ease'
              }}>
                Learn more <ArrowRight size={16} className="arrow-icon" style={{ transition: 'transform 0.3s ease' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 242, 254, 0.15);
        }
        .service-card:hover .border-glow {
          opacity: 1;
        }
        .service-card:hover .icon-wrapper {
          transform: scale(1.1) translateY(-5px);
        }
        .service-card:hover .arrow-btn {
          opacity: 1;
          color: white;
        }
        .service-card:hover .arrow-icon {
          transform: translateX(5px);
        }
      `}</style>
    </section>
  );
}
