import { useState } from 'react';
import { Box, Activity, Calculator, Cog, Flame, CheckCircle, Gauge, Cpu } from 'lucide-react';
import { sound } from '../utils/sound';

export default function BentoGrid() {
  // Interactive Gear Calculator State
  const [inputRpm, setInputRpm] = useState(1500);
  const [inputTorque, setInputTorque] = useState(25); // Nm
  const [gearRatio, setGearRatio] = useState(8); // 8:1

  const efficiency = 0.96;
  const outputRpm = (inputRpm / gearRatio).toFixed(1);
  const outputTorque = (inputTorque * gearRatio * efficiency).toFixed(1);
  const mechanicalPowerKw = ((2 * Math.PI * inputRpm * inputTorque) / 60000).toFixed(2);
  const mechanicalPowerHp = (mechanicalPowerKw * 1.341).toFixed(2);

  return (
    <section id="capabilities" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">CHAPTER 03 // CORE COMPETENCIES</div>
          <h2 className="section-title">ENGINEERING TOOLING & BENTO</h2>
          <p className="section-subtitle">
            A verified multidisciplinary toolkit bridging theoretical physics, computational simulation, and hands-on CNC fabrication.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px',
          }}
        >
          {/* Card 1: CAD & Parametric Modeling (Span 7) */}
          <div
            className="glass-panel"
            style={{
              gridColumn: 'span 7',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Box size={22} style={{ color: 'var(--accent-amber)' }} />
                <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.35rem', fontWeight: 700, color: '#fff' }}>
                  PARAMETRIC CAD & MECHANICAL DESIGN
                </h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '24px' }}>
                Advanced 3D surface and solid parametric modeling, complex mechanical assemblies (1,000+ parts), sheet metal stamping design, and master model architecture.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                {[
                  { name: 'SolidWorks (CSWP Certified)', level: 'Expert (6+ Yrs)' },
                  { name: 'Siemens NX', level: 'Surface & Assemblies' },
                  { name: 'Autodesk Inventor', level: 'Kinematic Simulation' },
                  { name: 'PTC Creo / CATIA', level: 'Parametric Robustness' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      background: 'rgba(9, 11, 14, 0.65)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(148, 163, 184, 0.1)',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-tech)', fontSize: '0.88rem', fontWeight: 600, color: '#f8fafc' }}>
                      {item.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)', marginTop: '2px' }}>
                      {item.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: '28px',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
              }}
            >
              <span>GD&T ASME Y14.5</span> • <span>TOLERANCE STACK-UP</span> • <span>DFM / DFA OPTIMIZED</span>
            </div>
          </div>

          {/* Card 2: Interactive Gear Calculator Widget (Span 5) */}
          <div
            className="glass-panel"
            style={{
              gridColumn: 'span 5',
              padding: '32px',
              border: '1px solid rgba(255, 159, 28, 0.35)',
              background: 'linear-gradient(180deg, rgba(22, 28, 36, 0.9) 0%, rgba(15, 19, 24, 0.95) 100%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Calculator size={22} style={{ color: 'var(--accent-amber)' }} />
              <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
                KINEMATIC GEAR CALCULATOR
              </h3>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '20px' }}>
              Real-time drivetrain reducer synthesis with efficiency loss calculations:
            </p>

            {/* Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-dim)' }}>INPUT SPEED (RPM):</span>
                  <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>{inputRpm} RPM</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="4000"
                  step="100"
                  value={inputRpm}
                  onChange={(e) => {
                    sound.playClick();
                    setInputRpm(Number(e.target.value));
                  }}
                  style={{ width: '100%', accentColor: 'var(--accent-amber)' }}
                  aria-label="Input Speed RPM"
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-dim)' }}>GEAR REDUCTION RATIO (i:1):</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{gearRatio}:1</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  step="1"
                  value={gearRatio}
                  onChange={(e) => {
                    sound.playClick();
                    setGearRatio(Number(e.target.value));
                  }}
                  style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                  aria-label="Reduction Ratio"
                />
              </div>
            </div>

            {/* Calculated Output Telemetry */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
                padding: '14px',
                background: 'rgba(9, 11, 14, 0.8)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>OUTPUT TORQUE</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
                  {outputTorque} N·m
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>OUTPUT RPM</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  {outputRpm} RPM
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>POWER SHAFT</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                  {mechanicalPowerKw} kW ({mechanicalPowerHp} HP)
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>EFFICIENCY (η)</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: '#10b981' }}>
                  {(efficiency * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: FEA & Numerical Simulation (Span 4) */}
          <div
            className="glass-panel"
            style={{
              gridColumn: 'span 4',
              padding: '30px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Activity size={22} style={{ color: 'var(--accent-cyan)' }} />
              <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                FEA & CAE ANALYSIS
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Linear and non-linear structural stress analysis, modal vibrational resonance, transient dynamics, and fatigue life prediction.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['ANSYS Workbench & Mechanical', 'Abaqus Non-Linear Contact', 'Altair HyperMesh Pre-Processing', 'Modal & Harmonics Resonance'].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={14} style={{ color: 'var(--accent-cyan)' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 4: Precision CNC & Manufacturing (Span 4) */}
          <div
            className="glass-panel"
            style={{
              gridColumn: 'span 4',
              padding: '30px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Cog size={22} style={{ color: 'var(--accent-amber)' }} />
              <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                CNC & FABRICATION
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Hands-on multi-axis CNC programming, toolpath optimization, Wire EDM, DMLS metal 3D printing, and CMM metrology inspection.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['5-Axis Mastercam & NX CAM', 'Wire EDM Precision Profiling', 'DMLS Metal Additive Printing', 'Renishaw CMM Inspection'].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={14} style={{ color: 'var(--accent-amber)' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 5: CFD & Thermal Architecture (Span 4) */}
          <div
            className="glass-panel"
            style={{
              gridColumn: 'span 4',
              padding: '30px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Flame size={22} style={{ color: '#f59e0b' }} />
              <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                CFD & THERMAL SYSTEMS
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Incompressible & compressible Navier-Stokes flow modeling, conjugate heat transfer, aerodynamics, and micro-channel cold plate design.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['OpenFOAM Polyhedral Meshing', 'ANSYS Fluent Multiphase CFD', 'Conjugate Heat Transfer (CHT)', 'Aerodynamic Drag Optimization'].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={14} style={{ color: '#f59e0b' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          #capabilities .glass-panel {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
