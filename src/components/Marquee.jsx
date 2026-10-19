import { sound } from '../utils/sound';
import { Cog, Flame, Wind, Activity, Gauge, Cpu, Box, Wrench } from 'lucide-react';

export default function Marquee() {
  const items = [
    { label: 'FINITE ELEMENT ANALYSIS (FEA)', icon: Activity },
    { label: 'COMPUTATIONAL FLUID DYNAMICS (CFD)', icon: Wind },
    { label: 'PARAMETRIC CAD & SOLIDWORKS', icon: Box },
    { label: '5-AXIS CNC & PRECISION CAM', icon: Cog },
    { label: 'THERMAL ARCHITECTURE', icon: Flame },
    { label: 'ROBOTIC ACTUATION & KINEMATICS', icon: Cpu },
    { label: 'GD&T (ASME Y14.5M)', icon: Gauge },
    { label: 'RAPID METALLIC PROTOTYPING', icon: Wrench },
  ];

  return (
    <div
      style={{
        position: 'relative',
        padding: '24px 0',
        backgroundColor: 'rgba(15, 19, 24, 0.85)',
        borderTop: '1px solid rgba(148, 163, 184, 0.12)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        zIndex: 5,
      }}
      onMouseEnter={() => sound.playClick()}
    >
      <div
        className="marquee-track"
        style={{
          display: 'inline-flex',
          gap: '48px',
          animation: 'scrollMarquee 26s linear infinite',
        }}
      >
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                transition: 'color 0.2s ease',
              }}
              className="marquee-item"
            >
              <Icon size={16} style={{ color: 'var(--accent-amber)' }} />
              <span>{item.label}</span>
              <span style={{ color: 'var(--accent-cyan)', opacity: 0.5, marginLeft: '8px' }}>//</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-item:hover {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}
