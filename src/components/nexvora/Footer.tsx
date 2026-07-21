'use client';

import React from 'react';
import { Logo } from './Logo';
import { Twitter, Instagram, Linkedin, Github } from './SocialIcons';

export function Footer() {
  return (
    <footer style={{ 
      padding: '80px 0 40px', 
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(20px)',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '60px',
          marginBottom: '60px'
        }}>
          {/* Brand Col */}
          <div style={{ flex: '2 1 300px' }}>
            <a href="#" style={{ textDecoration: 'none', marginBottom: '24px', display: 'inline-block' }}>
              <Logo isFooter={true} />
            </a>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '24px', maxWidth: '300px' }}>
              We design premium, conversion-focused websites for ambitious brands and startups worldwide.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" style={{ 
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', textDecoration: 'none', transition: 'all 0.3s ease'
                }} className="social-icon">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Col */}
          <div style={{ flex: '1 1 150px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '24px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Home', 'Portfolio', 'Pricing', 'FAQ', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.3s ease' }} className="footer-link">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '24px' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Corporate Sites', 'E-Commerce', 'SaaS Landing Pages', 'UI/UX Design', 'SEO'].map(link => (
                <a key={link} href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.3s ease' }} className="footer-link">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ 
          paddingTop: '32px', 
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '14px'
        }}>
          <div>&copy; {new Date().getFullYear()} Nexvora Studio. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }} className="footer-link">Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }} className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        .social-icon:hover {
          background: var(--primary) !important;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 242, 254, 0.4);
        }
        .footer-link:hover {
          color: var(--primary) !important;
        }
      `}</style>
    </footer>
  );
}
