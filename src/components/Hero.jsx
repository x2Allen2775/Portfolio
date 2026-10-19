import { sound } from '../utils/sound';
import { ArrowDown, Layers, Terminal, Compass } from 'lucide-react';
import GearScene from './GearScene';

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '90px',
        paddingBottom: '60px',
        overflow: 'hidden',
      }}
    >
      {/* 3D WebGL Gear Scene Background */}
      <GearScene />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Specification Top Meta Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}
        >
          <span className="tech-badge amber">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-amber)' }} />
            REV 4.2 // MASTER BLUEPRINT
          </span>
          <span className="tech-badge cyan">
            <Compass size={12} />
            TOLERANCE ±0.005mm
          </span>
          <span className="tech-badge">
            <Layers size={12} />
            ASME Y14.5 COMPLIANT
          </span>
        </div>

        {/* Hero Headline with fluid, non-clipping typography */}
        <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 8.5vw, 6.8rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              margin: '0 0 8px 0',
              color: '#ffffff',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.7)',
            }}
          >
            MECHANICAL
          </h1>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 8.5vw, 6.8rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--accent-amber)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              textShadow: '0 0 35px rgba(255, 159, 28, 0.35)',
            }}
          >
            <span>ENGINEER</span>
            <span
              style={{
                fontSize: 'clamp(1.2rem, 3.5vw, 2.6rem)',
                color: 'var(--accent-cyan)',
                verticalAlign: 'super',
              }}
            >
              ®
            </span>
          </div>
        </div>

        {/* Story Intro Statement */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: 'var(--text-muted)',
            maxWidth: '620px',
            marginTop: '28px',
            marginBottom: '40px',
            lineHeight: 1.65,
          }}
        >
          Taming entropy and choreographing physics. Crafting high-reduction planetary drivetrains, 5-axis automated machining cells, and computational fluid dynamic runners with micron-level precision.
        </p>

        {/* Action CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#projects"
            onClick={() => sound.playRelay()}
            className="btn-primary"
          >
            <span>EXPLORE BLUEPRINTS</span>
            <ArrowDown size={18} />
          </a>

          <a
            href="#capabilities"
            onClick={() => sound.playClick()}
            className="btn-secondary"
          >
            <Terminal size={17} />
            <span>TOOLING & CAD SPECS</span>
          </a>
        </div>

        {/* Live HUD Telemetry Widget */}
        <div
          style={{
            marginTop: '64px',
            padding: '16px 20px',
            maxWidth: '680px',
            background: 'rgba(15, 19, 24, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
            borderRadius: 'var(--radius-md)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
              KINEMATIC RATIO
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
              2:1 MESHMATE
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
              PEAK TORQUE
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
              480 N·m
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
              YIELD STRENGTH
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
              880 MPa (Ti-6Al-4V)
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
              SAFETY FACTOR
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: '#10b981' }}>
              n = 2.85 (FEA)
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint Corner Accents */}
      <div className="cad-mark cad-corner-tl" />
      <div className="cad-mark cad-corner-tr" />
      <div className="cad-mark cad-corner-bl" />
      <div className="cad-mark cad-corner-br" />
    </section>
  );
}
