import { useState, useEffect } from 'react';
import { sound } from '../utils/sound';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Deterministic progress counter that finishes in ~1.6s
    const startTime = performance.now();
    const duration = 1600; // ms

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        sound.playRelay();
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 450);
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  const brand = "MECHANEMA®";

  const getSubStatus = (p) => {
    if (p < 25) return "CALIBRATING 3D KINEMATIC SOLVER...";
    if (p < 55) return "MESHING 24-TOOTH INVOLUTE GEARS...";
    if (p < 85) return "COMPUTING VON MISES STRESS TENSORS...";
    return "ASSEMBLY SYNCHRONIZED // ALL SYSTEMS NOMINAL";
  };

  return (
    <div
      id="preloader"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#090b0e',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s ease',
        pointerEvents: isExiting ? 'none' : 'all',
      }}
    >
      {/* Blueprint grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.6,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '440px', width: '100%' }}>
        {/* Animated Gear Icon */}
        <div style={{ display: 'inline-block', marginBottom: '28px' }}>
          <svg
            width="56"
            height="56"
            viewBox="0 0 64 64"
            fill="none"
            style={{
              animation: 'pulseGear 4s linear infinite',
              filter: 'drop-shadow(0 0 16px rgba(255, 159, 28, 0.45))',
            }}
          >
            <path
              d="M30 6h4l1 6 5 2 5-4 3 3-3 6 4 4 6-2 1 4-5 4 1 5 6 3-2 4-6-1-3 5 4 5-3 3-5-3-4 4 2 6-4 1-4-5-5 1-3 6-4-2 1-6-5-3-5 4-3-3 3-6-4-4-6 2-1-4 5-4-1-5-6-3 2-4 6 1 3-5-4-5 3-3 5 3 4-4-2-6 4-1 4 5 5-1z"
              fill="#ff9f1c"
              stroke="#ffbf69"
              strokeWidth="1"
            />
            <circle cx="32" cy="32" r="12" fill="#090b0e" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="32" cy="32" r="4" fill="#ff9f1c" />
          </svg>
        </div>

        {/* Letter-by-letter Brand Reveal */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 7vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: '#f8fafc',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'center',
            gap: '2px',
          }}
        >
          {brand.split('').map((char, index) => {
            const charThreshold = (index / brand.length) * 85;
            const isRevealed = progress >= charThreshold;
            return (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  opacity: isRevealed ? 1 : 0.15,
                  transform: isRevealed ? 'translateY(0)' : 'translateY(8px)',
                  color: char === '®' ? 'var(--accent-amber)' : 'inherit',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  textShadow: isRevealed ? '0 0 20px rgba(255, 159, 28, 0.3)' : 'none',
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Telemetry Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '18px',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-amber))',
              boxShadow: '0 0 12px var(--accent-amber)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {/* Technical readout row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
          }}
        >
          <span style={{ color: 'var(--accent-amber)', fontWeight: 600 }}>
            {String(progress).padStart(3, '0')}% ASSEMBLED
          </span>
          <span style={{ color: 'var(--accent-cyan)' }}>ISO-2768-m</span>
        </div>

        <div
          style={{
            marginTop: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {getSubStatus(progress)}
        </div>
      </div>
    </div>
  );
}
