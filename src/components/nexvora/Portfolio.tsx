'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

export function Portfolio() {
  const projects = [
    {
      title: 'Aura Fitness',
      category: 'Health & Wellness',
      color: 'linear-gradient(135deg, #f43f5e, #fb923c)',
      imagePlaceholder: 'radial-gradient(circle at top right, rgba(244, 63, 94, 0.2), transparent), linear-gradient(to bottom, #111, #000)',
      delay: 0
    },
    {
      title: 'Nova Real Estate',
      category: 'Property',
      color: 'linear-gradient(135deg, #3b82f6, #2dd4bf)',
      imagePlaceholder: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.2), transparent), linear-gradient(to bottom, #111, #000)',
      delay: 0.2
    },
    {
      title: 'Lumina Tech',
      category: 'SaaS Platform',
      color: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
      imagePlaceholder: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.2), transparent), linear-gradient(to bottom, #111, #000)',
      delay: 0.4
    }
  ];

  return (
    <section id="portfolio">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '24px' }}
          >
            Our Latest <span className="text-gradient">Masterpieces</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}
          >
            Explore our Awwwards-winning designs crafted for high-growth brands.
          </motion.p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: project.delay }}
              className="portfolio-card"
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '0',
                alignItems: 'center'
              }}
            >
              {/* Browser Mockup Area */}
              <div style={{ padding: '40px', background: 'rgba(0,0,0,0.2)' }}>
                <div style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  borderRadius: '12px',
                  background: '#0a0a0a',
                  border: '1px solid #333',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  position: 'relative'
                }} className="browser-mockup">
                  
                  {/* Browser Top Bar */}
                  <div style={{ 
                    height: '24px', background: '#1a1a1a', borderBottom: '1px solid #333',
                    display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px'
                  }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                  </div>
                  
                  {/* Fake Website Content */}
                  <div style={{ 
                    flex: 1, 
                    background: project.imagePlaceholder,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <div style={{ width: '60%', height: '40%', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>

                  {/* Hover Overlay */}
                  <div className="portfolio-overlay" style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '16px',
                    opacity: 0, transition: 'all 0.4s ease'
                  }}>
                    <button className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '14px' }}>
                      <ExternalLink size={16} /> Live Preview
                    </button>
                    <button className="btn btn-outline" style={{ padding: '12px 24px', fontSize: '14px', background: 'transparent', border: '1px solid white' }}>
                      View Case Study
                    </button>
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div style={{ padding: '40px 60px' }}>
                <div style={{
                  display: 'inline-block', padding: '6px 16px', borderRadius: '99px',
                  background: 'rgba(255,255,255,0.05)', fontSize: '12px', fontWeight: 600,
                  color: 'rgba(255,255,255,0.8)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px'
                }}>
                  {project.category}
                </div>
                <h3 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: '24px' }}>
                  {project.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '32px' }}>
                  A completely custom-built digital experience focusing on seamless user journeys, blazing-fast performance, and high conversion rates. Designed from scratch to dominate the industry.
                </p>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {['UI/UX Design', 'Development', 'SEO'].map(tag => (
                    <span key={tag} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', paddingBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <button className="btn btn-outline">
            View All Projects <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        .portfolio-card:hover .browser-mockup {
          transform: scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.8);
        }
        .browser-mockup {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .browser-mockup:hover .portfolio-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
