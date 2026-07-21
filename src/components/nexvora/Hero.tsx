'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, MessageCircle, Zap, Shield, Smartphone, Search, Star } from 'lucide-react';

const MagneticButton = ({ children, className, href }: { children: React.ReactNode, className: string, href: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

export function Hero() {
  const features = [
    { text: 'Fast Loading', icon: <Zap size={16} color="#00f2fe" />, top: '10%', left: '-10%', delay: 0 },
    { text: 'SEO Ready', icon: <Search size={16} color="#8b5cf6" />, top: '40%', right: '-15%', delay: 1 },
    { text: 'Secure', icon: <Shield size={16} color="#4facfe" />, bottom: '20%', left: '-5%', delay: 2 },
    { text: 'Premium UI', icon: <Star size={16} color="#d946ef" />, top: '-5%', right: '10%', delay: 3 },
  ];

  return (
    <section 
      id="home" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px', // Space for fixed navbar
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
        
        {/* Left Side Content */}
        <div style={{ flex: '1 1 min(500px, 100%)', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '99px',
              marginBottom: '24px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--primary)'
            }}>
              ✨ Award-Winning Web Design Agency
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(40px, 5vw, 64px)', 
              lineHeight: 1.1,
              marginBottom: '24px',
              letterSpacing: '-1px'
            }}>
              We Design Websites That Turn <span className="text-gradient">Visitors Into Customers.</span>
            </h1>
            
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '40px',
              maxWidth: '540px',
              lineHeight: 1.6
            }}>
              Stop losing potential clients to bad design. We craft ultra-premium, fast-loading, and conversion-optimized websites for ambitious brands and startups worldwide.
            </p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <MagneticButton href="https://wa.me/919069296664?text=Hi%20Nexvora%20Studio%20%F0%9F%91%8B%0A%0AI%20would%20like%20to%20claim%20my%20FREE%20Demo%20Website.%0A%0AMy%20Details%3A%0A%0A%E2%80%A2%20Name%3A%0A%E2%80%A2%20Business%20Name%3A%0A%E2%80%A2%20Business%20Type%3A%0A%0AI%20saw%20your%20website%20and%20I'm%20interested%20in%20getting%20a%20premium%20website%20for%20my%20business.%0A%0APlease%20guide%20me%20through%20the%20next%20steps.%0A%0AThank%20you!" className="btn btn-primary pulse-glow">
                Claim FREE Demo Website <ArrowRight size={20} />
              </MagneticButton>
              <MagneticButton href="https://wa.me/919069296664?text=Hi%20Nexvora%20Studio%20%F0%9F%91%8B%0A%0AI%20would%20like%20to%20discuss%20my%20website%20project.%0A%0ACan%20you%20please%20share%20more%20details%3F" className="btn btn-outline">
                <MessageCircle size={20} /> Chat on WhatsApp
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* Right Side Laptop Mockup */}
        <div style={{ flex: '1 1 min(500px, 100%)', position: 'relative', display: 'flex', justifyContent: 'center', perspective: '1000px' }}>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.2, type: 'spring' }}
            style={{ position: 'relative', width: '100%', maxWidth: '600px' }}
          >
            {/* The Laptop */}
            <div style={{
              width: '100%',
              aspectRatio: '16/10',
              background: '#0f172a',
              border: '8px solid #1e293b',
              borderRadius: '16px 16px 0 0',
              borderBottomWidth: '12px',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 100px rgba(139, 92, 246, 0.3)',
              overflow: 'hidden'
            }}>
              {/* Laptop Screen Glare */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)',
                transform: 'skewY(-15deg)', transformOrigin: 'top left', zIndex: 10
              }} />
              
              {/* Fake Website UI */}
              <div style={{ padding: '20px', height: '100%', background: '#0a0f1c' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                  <div style={{ width: '40px', height: '12px', background: 'var(--primary)', borderRadius: '4px' }} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ width: '30px', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
                    <div style={{ width: '30px', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
                  </div>
                </div>
                <div style={{ width: '60%', height: '24px', background: 'rgba(255,255,255,0.8)', borderRadius: '6px', marginBottom: '16px' }} />
                <div style={{ width: '40%', height: '16px', background: 'rgba(255,255,255,0.4)', borderRadius: '6px', marginBottom: '30px' }} />
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '100px', height: '32px', background: 'var(--accent)', borderRadius: '16px' }} />
                  <div style={{ width: '100px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px' }} />
                </div>
                
                <div style={{ display: 'flex', gap: '12px', marginTop: '40px' }}>
                  <div style={{ flex: 1, height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} />
                  <div style={{ flex: 1, height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} />
                  <div style={{ flex: 1, height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} />
                </div>
              </div>
            </div>
            
            {/* Laptop Base */}
            <div style={{
              width: '120%',
              marginLeft: '-10%',
              height: '16px',
              background: 'linear-gradient(to right, #444, #777, #444)',
              borderRadius: '0 0 16px 16px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
              position: 'relative'
            }}>
              {/* Trackpad indent */}
              <div style={{
                position: 'absolute',
                top: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: '60px', height: '4px',
                background: '#222',
                borderRadius: '0 0 4px 4px'
              }} />
            </div>

            {/* Floating Feature Cards */}
            <div className="md-flex" style={{ display: 'none' }}>
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + (i * 0.2) }}
                  style={{
                    position: 'absolute',
                    top: feature.top,
                    left: feature.left,
                    right: feature.right,
                    bottom: feature.bottom,
                    zIndex: 20
                  }}
                  className={i % 2 === 0 ? "animate-float" : "animate-float-reverse"}
                >
                  <div className="glass-panel" style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '12px 20px',
                    borderRadius: '99px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    whiteSpace: 'nowrap',
                    fontSize: '14px',
                    fontWeight: 600
                  }}>
                    {feature.icon} {feature.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
