'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export function FAQ() {
  const faqs = [
    {
      q: "How long does it take to build a custom website?",
      a: "Our average delivery time is 2 to 4 weeks depending on the complexity of the project. A simple 3-page site can be completed in just 48 hours."
    },
    {
      q: "Do you use templates?",
      a: "No. Every website we build is 100% custom-designed from scratch to match your brand identity and goals. We never use pre-made templates."
    },
    {
      q: "What is included in the FREE Demo?",
      a: "We will design the hero section and core structure of your home page specifically for your brand. You get to see our design quality before paying a single rupee."
    },
    {
      q: "Will my website be mobile responsive?",
      a: "Absolutely. 100% of the websites we build are fully responsive and optimized to look perfect on desktops, tablets, and smartphones."
    },
    {
      q: "Do you provide SEO services?",
      a: "Yes. All our websites are built with technical SEO best practices, fast loading speeds, and semantic HTML to help you rank higher on Google."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '24px' }}
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel"
              style={{ overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div style={{ 
                padding: '24px 32px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                fontWeight: 600,
                fontSize: '18px'
              }}>
                {faq.q}
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: 'var(--primary)' }}
                >
                  {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </motion.div>
              </div>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div style={{ 
                      padding: '0 32px 32px', 
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: 1.8 
                    }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
