'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Gift, Star, Zap } from 'lucide-react';

export function Pricing() {
  return (
    <section id="pricing">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '24px' }}
          >
            Transparent <span className="text-gradient">Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}
          >
            No hidden fees. Just premium quality and fast delivery.
          </motion.p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          alignItems: 'center' // This ensures the central card can be larger
        }}>
          
          {/* Starter Plan */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="glass-panel"
            style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column' }}
          >
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Starter</h3>
            <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '24px', fontFamily: 'var(--font-sora)' }}>₹7,999</div>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>Perfect for small businesses starting out.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', flex: 1 }}>
              {['3 Page Website', 'Mobile Responsive', 'Contact Form', 'Basic SEO', '1 Revision'].map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px' }}>
                  <Check size={16} color="var(--primary)" /> {feature}
                </div>
              ))}
            </div>
            
            <button className="btn btn-outline" style={{ width: '100%' }}>Choose Starter</button>
          </motion.div>

          {/* FREE DEMO - Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="glass-panel"
            style={{ 
              padding: '60px 40px', 
              display: 'flex', flexDirection: 'column',
              transform: 'scale(1.05)',
              position: 'relative',
              background: 'rgba(10, 15, 30, 0.9)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 242, 254, 0.2)',
              zIndex: 10
            }}
          >
            {/* Glowing Background */}
            <div style={{
              position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
              background: 'radial-gradient(circle, rgba(0,242,254,0.1) 0%, transparent 60%)',
              zIndex: -1, pointerEvents: 'none'
            }} />
            
            <div style={{
              position: 'absolute', top: '24px', right: '-12px',
              background: 'linear-gradient(135deg, var(--secondary), var(--accent))',
              padding: '6px 16px', fontSize: '12px', fontWeight: 800, letterSpacing: '1px',
              textTransform: 'uppercase', boxShadow: '0 4px 15px rgba(139,92,246,0.5)',
              borderRadius: '4px 0 0 4px', display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              <Zap size={14} /> Most Requested
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 242, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Gift size={24} />
              </div>
              <h3 style={{ fontSize: '28px' }} className="text-gradient">FREE DEMO</h3>
            </div>
            
            <div style={{ fontSize: '56px', fontWeight: 800, marginBottom: '24px', fontFamily: 'var(--font-sora)' }}>₹0</div>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px', fontSize: '16px', lineHeight: 1.6 }}>
              We&apos;ll design a custom premium landing page demo for your brand. Pay only if you love it.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', flex: 1 }}>
              {[
                'Premium Landing Page', 
                'Responsive Design', 
                'WhatsApp Integration', 
                'Contact Form', 
                '48 Hour Delivery', 
                'No Hidden Charges'
              ].map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: 500 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={14} color="white" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>
            
            <a href="https://wa.me/919069296664?text=Hi%20Nexvora%20Studio%20%F0%9F%91%8B%0A%0AI%20would%20like%20to%20claim%20my%20FREE%20Demo%20Website.%0A%0AMy%20Details%3A%0A%0A%E2%80%A2%20Name%3A%0A%E2%80%A2%20Business%20Name%3A%0A%E2%80%A2%20Business%20Type%3A%0A%0AI%20saw%20your%20website%20and%20I'm%20interested%20in%20getting%20a%20premium%20website%20for%20my%20business.%0A%0APlease%20guide%20me%20through%20the%20next%20steps.%0A%0AThank%20you!" className="btn btn-primary pulse-glow" style={{ width: '100%', fontSize: '18px', padding: '20px', textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
              Claim FREE Demo
            </a>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4 }}
            className="glass-panel"
            style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', position: 'relative' }}
          >
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)',
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
              padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 600,
              color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '4px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Star size={12} color="#facc15" /> Premium & Business
            </div>
            
            <h3 style={{ fontSize: '24px', marginBottom: '8px', marginTop: '16px' }}>Business</h3>
            <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '24px', fontFamily: 'var(--font-sora)' }}>₹14,999</div>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>For growing brands that need more power.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', flex: 1 }}>
              {['Up to 8 Pages', 'Advanced Animations', 'CMS Integration', 'Advanced SEO', '3 Revisions', 'Priority Support'].map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px' }}>
                  <Check size={16} color="var(--primary)" /> {feature}
                </div>
              ))}
            </div>
            
            <button className="btn btn-outline" style={{ width: '100%' }}>Choose Business</button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
