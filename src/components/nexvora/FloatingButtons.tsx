'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowUp } from 'lucide-react';

export function FloatingButtons() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="glass-pill"
            style={{
              width: '50px', height: '50px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)'
            }}
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/919069296664?text=Hi%20Nexvora%20Studio%20%F0%9F%91%8B%0A%0AI%20would%20like%20to%20discuss%20my%20website%20project.%0A%0ACan%20you%20please%20share%20more%20details%3F"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        style={{
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', textDecoration: 'none',
          boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4)'
        }}
        whileHover={{ scale: 1.1, boxShadow: '0 15px 40px rgba(37, 211, 102, 0.6)' }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={32} />
      </motion.a>
    </div>
  );
}
