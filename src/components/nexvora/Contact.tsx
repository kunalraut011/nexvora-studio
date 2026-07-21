'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Send } from 'lucide-react';
import { Instagram } from './SocialIcons';

export function Contact() {
  return (
    <section id="contact" style={{ position: 'relative' }}>
      <div className="container">
        <div className="glass-panel" style={{ 
          padding: '80px 60px', 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))'
        }}>
          
          <div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '24px' }}>
              Let&apos;s Build Something <span className="text-gradient">Incredible</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '40px' }}>
              Ready to elevate your brand with a premium digital experience? Get in touch with us today.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '4px' }}>WhatsApp</div>
                  <div style={{ fontWeight: 600 }}>+91 9069296664</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '4px' }}>Email</div>
                  <div style={{ fontWeight: 600 }}>kunalraut0009@gmail.com</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--magenta)' }}>
                  <Instagram size={20} />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '4px' }}>Instagram</div>
                  <div style={{ fontWeight: 600 }}>@nexvorastudio</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '24px' }}>
                <input type="text" aria-label="Your Name" placeholder="Your Name" className="input-field" style={{ flex: 1 }} />
                <input type="email" aria-label="Your Email" placeholder="Your Email" className="input-field" style={{ flex: 1 }} />
              </div>
              <input type="text" aria-label="Subject" placeholder="Subject" className="input-field" />
              <textarea aria-label="Project Details" placeholder="Tell us about your project..." className="input-field" rows={5} />
              <button className="btn btn-primary" type="button" style={{ width: '100%', marginTop: '16px' }}>
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
          
        </div>
      </div>

      <style>{`
        .input-field {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 16px 24px;
          color: white;
          font-family: inherit;
          font-size: 16px;
          transition: all 0.3s ease;
          width: 100%;
        }
        .input-field:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(255,255,255,0.05);
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.1);
        }
      `}</style>
    </section>
  );
}
