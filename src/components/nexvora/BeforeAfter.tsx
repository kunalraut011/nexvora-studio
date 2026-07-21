'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setSliderPosition(percent);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section style={{ padding: '120px 0', background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '24px' }}>
            The Nexvora <span className="text-gradient">Difference</span>
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}>Slide to see the transformation.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/10',
            borderRadius: '24px',
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'ew-resize',
            boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(139, 92, 246, 0.2)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* AFTER LAYER (Top Layer, clipped on the left) */}
          <div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            clipPath: `inset(0 0 0 ${sliderPosition}%)`,
            WebkitClipPath: `inset(0 0 0 ${sliderPosition}%)`,
            display: 'flex', flexDirection: 'column', userSelect: 'none',
            overflow: 'hidden', zIndex: 2
          }}>
            {/* Browser Header Dark */}
            <div style={{ height: '40px', background: '#0a0a0a', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '8px' }}>
               <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}/>
               <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}/>
               <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}/>
               <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ background: '#1a1a1a', borderRadius: '6px', height: '24px', width: '50%', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '12px', fontFamily: 'sans-serif' }}>
                    nexvorastudio.com
                  </div>
               </div>
            </div>
            {/* After Website Content */}
            <div style={{ flex: 1, background: '#030510', position: 'relative', overflow: 'hidden', padding: '40px', fontFamily: 'var(--font-inter)' }}>
                {/* Aurora Background */}
                <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '-50%', right: '-20%', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(0,242,254,0.15) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)' }} />
                
                {/* Navbar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '60px' }}>
                   <div style={{ color: 'white', fontWeight: 800, fontSize: '18px', fontFamily: 'var(--font-sora)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '6px' }} />
                      NEXVORA
                   </div>
                   <div style={{ display: 'flex', gap: '32px', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500 }}>
                     <span style={{ color: 'white' }}>Home</span>
                     <span>Services</span>
                     <span>Portfolio</span>
                     <span>Pricing</span>
                   </div>
                   <div style={{ padding: '10px 24px', background: 'linear-gradient(135deg, var(--secondary), var(--accent))', borderRadius: '99px', color: 'white', fontSize: '14px', fontWeight: 600, boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}>
                     Claim Demo
                   </div>
                </div>
                
                {/* Hero */}
                <div style={{ textAlign: 'center', maxWidth: '80%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                   <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', color: 'var(--primary)', marginBottom: '24px' }}>
                     ✨ Premium Web Design Agency
                   </div>
                   <h1 style={{ fontSize: '48px', color: 'white', fontFamily: 'var(--font-sora)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-1px' }}>
                     We Design Websites That Turn <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Visitors Into Customers.</span>
                   </h1>
                   <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '40px', maxWidth: '80%', margin: '0 auto', lineHeight: 1.6 }}>
                     Premium websites for businesses, startups, creators and local brands with high performance and modern UI.
                   </p>
                   <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                     <div style={{ padding: '16px 32px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '99px', color: 'white', fontSize: '14px', fontWeight: 600, boxShadow: '0 0 30px rgba(0,242,254,0.4)' }}>
                       Claim FREE Demo Website
                     </div>
                     <div style={{ padding: '16px 32px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '99px', color: 'white', fontSize: '14px', fontWeight: 600 }}>
                       Chat on WhatsApp
                     </div>
                   </div>
                </div>
                
                {/* Floating Mockup Cards */}
                <div style={{ position: 'absolute', top: '150px', left: '40px', padding: '16px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 15px var(--primary)' }} />
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>Lightning Fast</span>
                </div>
                
                <div style={{ position: 'absolute', bottom: '80px', right: '60px', padding: '16px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 15px var(--accent)' }} />
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>High Conversions</span>
                </div>
                
                {/* AFTER BADGE */}
                <div style={{ position: 'absolute', bottom: '32px', right: '32px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', padding: '12px 24px', borderRadius: '12px', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '12px', color: '#00f2fe', fontWeight: 800, letterSpacing: '2px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f2fe', boxShadow: '0 0 10px #00f2fe' }} /> AFTER
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>Modern • Fast • Premium UI</div>
                </div>
            </div>
          </div>

          {/* BEFORE LAYER (Bottom Layer) */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column', userSelect: 'none',
            overflow: 'hidden', zIndex: 1
          }}>
            {/* Browser Header Light */}
            <div style={{ height: '40px', background: '#d1d5db', borderBottom: '1px solid #9ca3af', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '8px' }}>
               <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}/>
               <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}/>
               <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}/>
               <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ background: '#f3f4f6', borderRadius: '2px', height: '24px', width: '50%', border: '1px solid #d1d5db', display: 'flex', alignItems: 'center', paddingLeft: '12px', color: '#4b5563', fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>
                    http://www.oldbusiness.com
                  </div>
               </div>
            </div>
            {/* Before Website Content */}
            <div style={{ flex: 1, background: '#ffffff', padding: '0', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif' }}>
                
                {/* Navbar */}
                <div style={{ padding: '24px 60px', background: '#ffffff', borderBottom: '4px solid #1d4ed8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div style={{ color: '#1e3a8a', fontWeight: 'bold', fontSize: '24px', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <div style={{ width: '24px', height: '24px', background: '#1d4ed8' }} /> OLD BUSINESS
                   </div>
                   <div style={{ display: 'flex', gap: '32px', color: '#2563eb', fontSize: '16px', textDecoration: 'underline' }}>
                     <span>Home</span>
                     <span>About Us</span>
                     <span>Services</span>
                     <span>Gallery</span>
                     <span>Contact</span>
                   </div>
                </div>
                
                {/* Hero */}
                <div style={{ background: '#f3f4f6', padding: '60px 80px', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '60px', alignItems: 'center' }}>
                   <div style={{ flex: 1 }}>
                     <h1 style={{ fontSize: '40px', color: '#111827', marginBottom: '24px', fontWeight: 'normal', lineHeight: 1.2 }}>
                       We Provide Best Services For Your Business
                     </h1>
                     <p style={{ color: '#4b5563', fontSize: '16px', marginBottom: '32px', lineHeight: 1.5 }}>
                       We are a company that provides various kinds of services to help your business grow and succeed. We have many years of experience in this field. Our main goal is customer satisfaction.
                     </p>
                     <button style={{ padding: '12px 24px', background: '#1d4ed8', color: 'white', border: 'none', fontSize: '14px', cursor: 'pointer' }}>
                       Read More
                     </button>
                   </div>
                   <div style={{ flex: 1 }}>
                     {/* Fake image placeholder */}
                     <div style={{ width: '100%', height: '240px', background: '#cbd5e1', border: '2px solid #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '14px' }}>
                       [ Stock Image of City Buildings ]
                     </div>
                   </div>
                </div>

                {/* Services */}
                <div style={{ padding: '40px 80px', display: 'flex', gap: '40px' }}>
                   {[1,2,3].map(i => (
                     <div key={i} style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '18px', color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '16px' }}>
                          {i === 1 ? 'About Us' : i === 2 ? 'Our Services' : 'Why Choose Us?'}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6 }}>
                          {i === 1 ? 'We are a company with many years of experience. Our main goal is customer satisfaction and delivering quality work on time.' : 
                           i === 2 ? '• Web Design\n• Development\n• Marketing\n• Branding' : 
                           '• Experienced Team\n• Quality Work\n• Affordable Price\n• On Time Delivery'}
                        </p>
                     </div>
                   ))}
                </div>
                
                {/* BEFORE BADGE */}
                <div style={{ position: 'absolute', bottom: '32px', left: '32px', background: 'rgba(255,255,255,0.95)', border: '1px solid #ddd', padding: '12px 24px', borderRadius: '12px', color: '#333', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: 800, letterSpacing: '2px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} /> BEFORE
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>Outdated • Slow • Poor UX</div>
                </div>
            </div>
          </div>

          {/* Slider Handle */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: `${sliderPosition}%`,
            width: '4px', background: 'var(--primary)',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.8)',
            zIndex: 20
          }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '48px', height: '48px',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              boxShadow: '0 0 30px rgba(0, 242, 254, 0.6), inset 0 0 10px rgba(255,255,255,0.5)',
              cursor: 'grab'
            }}>
              <div style={{ width: '3px', height: '16px', background: 'white', borderRadius: '2px' }} />
              <div style={{ width: '3px', height: '16px', background: 'white', borderRadius: '2px' }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
