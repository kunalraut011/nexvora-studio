'use client';

import React from 'react';
import Image from 'next/image';

export function Logo({ className = '', isFooter = false }: { className?: string, isFooter?: boolean }) {
  return (
    <div className={`${isFooter ? 'footer-logo-container' : 'logo-container'} ${className}`}>
      <div 
        className={isFooter ? "footer-logo" : "navbar-logo"}
        style={{ display: 'flex', alignItems: 'center', gap: '14px', maxWidth: 'none', maxHeight: 'none' }}
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ height: '100%', width: 'auto', display: 'block' }}
        >
          <polygon points="33,29.5 67,46.5 67,70.5 33,53.5" fill="#2563EB" />
          <polygon points="10,2 34,14 34,70 10,58" fill="#3B82F6" />
          <polygon points="66,30 90,42 90,98 66,86" fill="#3B82F6" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2px' }}>
          <span 
            className="logo-title"
            style={{ 
              fontFamily: 'var(--font-inter), sans-serif', 
              fontWeight: 800, 
              lineHeight: 1,
              color: '#FFFFFF',
              letterSpacing: '-0.5px'
            }}
          >
            Nexvora
          </span>
          <span 
            className="logo-subtitle"
            style={{ 
              fontFamily: 'var(--font-sora), sans-serif', 
              fontWeight: 500, 
              lineHeight: 1,
              color: '#3B82F6',
              letterSpacing: '4px',
              marginTop: '4px'
            }}
          >
            STUDIO
          </span>
        </div>
      </div>
    </div>
  );
}
