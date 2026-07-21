export default function Loading() {
  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
      background: 'var(--background)', display: 'flex', justifyContent: 'center', alignItems: 'center', 
      zIndex: 9999 
    }}>
      <div style={{ width: '80px', height: '80px', animation: 'fadeInOut 2s ease-in-out infinite' }}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <mask id="ribbon-mask-loading">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              <polygon points="22,30 42,10 78,70 58,90" fill="black" stroke="black" strokeWidth="6" strokeLinejoin="miter" />
            </mask>
          </defs>
          <g mask="url(#ribbon-mask-loading)">
            <polygon points="22,90 42,90 42,10 22,30" fill="#3B82F6" />
            <polygon points="58,90 78,70 78,10 58,10" fill="#3B82F6" />
          </g>
          <polygon points="22,30 42,10 78,70 58,90" fill="#2563EB" />
        </svg>
      </div>
      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.3; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
