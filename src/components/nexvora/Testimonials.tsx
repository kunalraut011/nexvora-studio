'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function Testimonials() {
  const reviews = [
    {
      text: "Nexvora Studio didn't just build a website; they transformed our entire digital presence. Our conversion rate tripled in the first month.",
      author: "Sarah Jenkins",
      role: "CEO, Elevate SaaS"
    },
    {
      text: "The attention to detail and premium design quality is unmatched. It literally looks and feels like a $100k agency website.",
      author: "Michael Chen",
      role: "Founder, Nova Real Estate"
    },
    {
      text: "Working with them was seamless. The animations and speed of our new site are incredible. Highly recommended for ambitious brands.",
      author: "Emma Watson",
      role: "Marketing Director, Lumina"
    }
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
            Loved By <span className="text-gradient">Founders</span>
          </motion.h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel"
              style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.1)' }}
            >
              <div style={{ color: '#facc15', fontSize: '24px', letterSpacing: '4px', marginBottom: '24px' }}>
                ★★★★★
              </div>
              <p style={{ fontSize: '18px', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '32px', flex: 1 }}>
                &quot;{review.text}&quot;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--secondary), var(--accent))' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '16px' }}>{review.author}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
