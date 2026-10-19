import { useState } from 'react';
import { sound } from '../utils/sound';
import { Sliders, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function Manifesto() {
  const [load, setLoad] = useState(12500); // Newtons
  const yieldStrength = 880; // MPa for Titanium 6Al-4V
  // Simulated stress concentration factor: stress in MPa = (load / 100) * 4.2
  const maxStress = Math.round((load / 100) * 4.2);
  const safetyFactor = (yieldStrength / maxStress).toFixed(2);
  const isYielding = maxStress >= yieldStrength;

  const handleSliderChange = (e) => {
    setLoad(Number(e.target.value));
    sound.playClick();
  };

  const manifestoText = [
    "We", "don't", "merely", "shape", "metal;", "we", "choreograph", "physics.",
    "Every", "planetary", "gear,", "every", "cantilever", "beam,", "and", "every",
    "computational", "fluid", "streamline", "is", "a", "mathematical", "symphony",
    "balancing", "finite", "stress", "against", "infinite", "entropy.",
  ];

  return (
    <section id="manifesto" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">CHAPTER 01 // PHILOSOPHY</div>
          <h2 className="section-title">THE ENGINEERING MANIFESTO</h2>
        </div>

        {/* Storytelling Word-by-Word Typography Display */}
        <div
          style={{
            maxWidth: '1000px',
            marginBottom: '64px',
            padding: '36px',
            background: 'rgba(15, 19, 24, 0.6)',
            border: '1px solid rgba(148, 163, 184, 0.14)',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
          }}
        >
          <div className="cad-mark cad-corner-tl" />
          <div className="cad-mark cad-corner-br" />

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 3.2vw, 2.4rem)',
              fontWeight: 700,
              lineHeight: 1.45,
              letterSpacing: '-0.01em',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 10px',
            }}
          >
            {manifestoText.map((word, idx) => {
              const isHighlight = ["physics.", "symphony", "entropy.", "shape"].includes(word);
              return (
                <span
                  key={idx}
                  style={{
                    color: isHighlight ? 'var(--accent-amber)' : 'var(--text-main)',
                    textShadow: isHighlight ? '0 0 16px rgba(255, 159, 28, 0.4)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={() => sound.playClick()}
                >
                  {word}
                </span>
              );
            })}
          </p>

          <div
            style={{
              marginTop: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-dim)',
              borderTop: '1px solid rgba(148, 163, 184, 0.1)',
              paddingTop: '16px',
            }}
          >
            <span>AXIOM // FIRST-PRINCIPLES MECHANICS</span>
            <span style={{ color: 'var(--accent-cyan)' }}>EQUATION OF STATE: σ ≤ [σ] / n</span>
          </div>
        </div>

        {/* Interactive FEA Stress & Safety Factor Sandbox */}
        <div
          className="glass-panel"
          style={{
            padding: '32px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sliders size={20} style={{ color: 'var(--accent-amber)' }} />
              <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
                INTERACTIVE FEA STRESS TENSOR SIMULATOR
              </h3>
            </div>
            <span className="tech-badge cyan">TI-6AL-4V // GR. 5 BILLET</span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', maxWidth: '780px' }}>
            Adjust the dynamic applied force vector below to observe how the structural von Mises stress concentration responds in real-time against the critical material yield criterion.
          </p>

          {/* Slider Control */}
          <div style={{ marginBottom: '28px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                marginBottom: '8px',
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>APPLIED DYNAMIC LOAD (F):</span>
              <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>
                {load.toLocaleString()} N ({((load / 9.81) / 1000).toFixed(2)} Metric Tons)
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="24000"
              step="500"
              value={load}
              onChange={handleSliderChange}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: '#1e293b',
                outline: 'none',
                cursor: 'pointer',
                accentColor: 'var(--accent-amber)',
              }}
              aria-label="Applied Dynamic Load"
            />
          </div>

          {/* Multi-Spectrum von Mises Stress Gauge */}
          <div style={{ marginBottom: '28px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-dim)',
                marginBottom: '6px',
              }}
            >
              <span>VON MISES STRESS SPECTRUM (0 → 1,000 MPa)</span>
              <span style={{ color: isYielding ? 'var(--vonmises-red)' : 'var(--accent-cyan)', fontWeight: 700 }}>
                σ_max: {maxStress} MPa
              </span>
            </div>
            <div
              style={{
                height: '14px',
                width: '100%',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, #0284c7 0%, #06b6d4 35%, #10b981 60%, #eab308 80%, #ef4444 100%)',
                position: 'relative',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.6)',
              }}
            >
              {/* Marker pin */}
              <div
                style={{
                  position: 'absolute',
                  top: '-4px',
                  left: `${Math.min((maxStress / 1000) * 100, 100)}%`,
                  transform: 'translateX(-50%)',
                  width: '6px',
                  height: '22px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 10px #ffffff, 0 2px 4px rgba(0,0,0,0.8)',
                  borderRadius: '2px',
                  transition: 'left 0.1s linear',
                }}
              />
            </div>
          </div>

          {/* Readout Telemetry Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            <div
              style={{
                padding: '16px',
                background: 'rgba(9, 11, 14, 0.7)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                YIELD STRENGTH (σ_y)
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
                {yieldStrength} MPa
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                ASTM B348 / Grade 5
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                background: 'rgba(9, 11, 14, 0.7)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                CALCULATED SAFETY FACTOR (n)
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: isYielding ? '#ef4444' : safetyFactor > 2 ? '#10b981' : '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{safetyFactor}</span>
                {isYielding ? <AlertTriangle size={18} /> : <ShieldCheck size={18} />}
              </div>
              <div style={{ fontSize: '0.75rem', color: isYielding ? '#ef4444' : 'var(--text-muted)', marginTop: '4px' }}>
                {isYielding ? 'PLASTIC DEFORMATION RISK' : safetyFactor > 2 ? 'AEROSPACE GRADE (n > 2.0)' : 'MARGINAL FACTOR'}
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                background: 'rgba(9, 11, 14, 0.7)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                ELASTIC DEFLECTION (δ)
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                {(maxStress * 0.0018).toFixed(3)} mm
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Young's Modulus E = 113.8 GPa
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
