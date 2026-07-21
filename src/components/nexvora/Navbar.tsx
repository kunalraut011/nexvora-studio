'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Services', 'Portfolio', 'Pricing', 'FAQ', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: isScrolled ? '16px' : '24px',
        left: '0',
        right: '0',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          borderRadius: '99px',
          background: isScrolled ? 'rgba(10, 15, 30, 0.8)' : 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isScrolled ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isScrolled ? '0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 242, 254, 0.05)' : 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <motion.a 
          href="#" 
          style={{ textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Logo />
        </motion.a>

        {/* Desktop Menu */}
        <div style={{ display: 'none', gap: '32px', alignItems: 'center' }} className="md-flex">
          {links.map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 500,
                position: 'relative',
                padding: '4px 0'
              }}
              whileHover="hover"
              initial="initial"
            >
              {link}
              <motion.div
                variants={{
                  initial: { scaleX: 0, opacity: 0 },
                  hover: { scaleX: 1, opacity: 1 }
                }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                  transformOrigin: 'left center'
                }}
              />
            </motion.a>
          ))}
        </div>

        <div style={{ display: 'none', gap: '16px' }} className="md-flex">
          <a href="https://wa.me/919069296664?text=Hi%20Nexvora%20Studio%20%F0%9F%91%8B%0A%0AI%20would%20like%20to%20discuss%20my%20website%20project.%0A%0ACan%20you%20please%20share%20more%20details%3F" className="btn btn-outline" style={{ padding: '10px 24px', fontSize: '14px' }}>
            WhatsApp
          </a>
          <a href="https://wa.me/919069296664?text=Hi%20Nexvora%20Studio%20%F0%9F%91%8B%0A%0AI%20would%20like%20to%20claim%20my%20FREE%20Demo%20Website.%0A%0AMy%20Details%3A%0A%0A%E2%80%A2%20Name%3A%0A%E2%80%A2%20Business%20Name%3A%0A%E2%80%A2%20Business%20Type%3A%0A%0AI%20saw%20your%20website%20and%20I'm%20interested%20in%20getting%20a%20premium%20website%20for%20my%20business.%0A%0APlease%20guide%20me%20through%20the%20next%20steps.%0A%0AThank%20you!" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
            Claim FREE Demo
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'white',
            padding: '10px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: '16px',
              right: '16px',
              marginTop: '12px',
              background: 'rgba(10, 15, 30, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(0, 242, 254, 0.2)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            className="md-none"
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: 500,
                  padding: '12px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                {link}
              </a>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              <a href="https://wa.me/919069296664?text=Hi%20Nexvora%20Studio%20%F0%9F%91%8B%0A%0AI%20would%20like%20to%20discuss%20my%20website%20project.%0A%0ACan%20you%20please%20share%20more%20details%3F" className="btn btn-outline" style={{ width: '100%' }}>WhatsApp</a>
              <a href="https://wa.me/919069296664?text=Hi%20Nexvora%20Studio%20%F0%9F%91%8B%0A%0AI%20would%20like%20to%20claim%20my%20FREE%20Demo%20Website.%0A%0AMy%20Details%3A%0A%0A%E2%80%A2%20Name%3A%0A%E2%80%A2%20Business%20Name%3A%0A%E2%80%A2%20Business%20Type%3A%0A%0AI%20saw%20your%20website%20and%20I'm%20interested%20in%20getting%20a%20premium%20website%20for%20my%20business.%0A%0APlease%20guide%20me%20through%20the%20next%20steps.%0A%0AThank%20you!" className="btn btn-primary" style={{ width: '100%' }}>Claim FREE Demo</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 992px) {
          .md-none { display: none !important; }
          .md-flex { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
