import { Award, Briefcase, GraduationCap, Trophy, ChevronRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Timeline() {
  const milestones = [
    {
      year: '2024 — PRESENT',
      role: 'SENIOR MECHANICAL DESIGN LEAD',
      org: 'ADVANCED KINEMATICS & ROBOTICS LAB',
      icon: Briefcase,
      color: 'var(--accent-amber)',
      description: 'Heading mechanical design for next-generation 6-DOF harmonic robotic arm joints, high-efficiency cycloidal gearboxes, and multi-axis CNC cells.',
      badges: ['High-Torque Planetary', 'ANSYS Contact FEA', 'AS9100 Metrology'],
    },
    {
      year: '2023',
      role: 'CHASSIS & VEHICLE DYNAMICS CAPTAIN',
      org: 'FORMULA STUDENT (FSAE) ELECTRIC RACING',
      icon: Trophy,
      color: 'var(--accent-cyan)',
      description: 'Engineered carbon-fiber composite monocoque chassis and double-wishbone pushrod suspension system. Achieved 1st place overall in vehicle dynamics and skidpad acceleration.',
      badges: ['CFRP Monocoque', 'Lap Time Simulation', 'Bellcrank Kinematics'],
    },
    {
      year: '2022',
      role: 'TURBOMACHINERY CFD RESEARCH CO-OP',
      org: 'NATIONAL RENEWABLE ENERGY & FLUIDICS INSTITUTE',
      icon: Award,
      color: '#f59e0b',
      description: 'Conducted high-performance computing (HPC) CFD flow simulations on Francis hydro-turbine runners, mitigating cavitation inception and draft tube vortex rope pulsations.',
      badges: ['OpenFOAM HPC', 'Eulerian Multiphase', 'Cavitation Inception'],
    },
    {
      year: '2021',
      role: 'NATIONAL ASME DESIGN COMPETITION LAUREATE',
      org: 'AMERICAN SOCIETY OF MECHANICAL ENGINEERS (ASME)',
      icon: Award,
      color: 'var(--accent-cyan)',
      description: 'Awarded 1st Prize for an autonomous amphibious pipeline inspection robot utilizing magnetic crawlers and ultrasonic non-destructive testing (NDT) transducers.',
      badges: ['Magnetic Crawlers', 'ASME 1st Place', 'US Provisional Patent'],
    },
    {
      year: '2020',
      role: 'B.S. IN MECHANICAL ENGINEERING (HONORS)',
      org: 'INSTITUTE OF TECHNOLOGY // SUMMA CUM LAUDE',
      icon: GraduationCap,
      color: 'var(--accent-steel)',
      description: 'Graduated top of cohort with specializations in continuum mechanics, finite element analysis, thermodynamics, and robotics control systems.',
      badges: ['Summa Cum Laude', 'Dean\'s Honor Roll', 'Tau Beta Pi Member'],
    },
  ];

  return (
    <section id="timeline" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">CHAPTER 04 // ENGINEERING TRAJECTORY</div>
          <h2 className="section-title">JOURNEY & RECOGNITION</h2>
          <p className="section-subtitle">
            A chronological timeline of technical leadership, competitive motorsports engineering, and academic rigor.
          </p>
        </div>

        {/* Timeline Schematic Track */}
        <div
          style={{
            position: 'relative',
            maxWidth: '960px',
            margin: '0 auto',
            paddingLeft: '32px',
          }}
        >
          {/* Vertical Schematic Conduit Line */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              bottom: '12px',
              left: '8px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--accent-amber) 0%, var(--accent-cyan) 60%, rgba(148, 163, 184, 0.2) 100%)',
              boxShadow: '0 0 10px rgba(255, 159, 28, 0.3)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {milestones.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    position: 'relative',
                  }}
                  onMouseEnter={() => sound.playClick()}
                >
                  {/* Schematic Node Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-32px',
                      top: '20px',
                      transform: 'translate(-50%, 0)',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#090b0e',
                      border: `2px solid ${item.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      boxShadow: `0 0 14px ${item.color}`,
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: item.color,
                      }}
                    />
                  </div>

                  {/* Content Glass Panel */}
                  <div
                    className="glass-panel"
                    style={{
                      padding: '28px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: item.color,
                          letterSpacing: '0.08em',
                        }}
                      >
                        {item.year}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--text-dim)',
                        }}
                      >
                        LOG // 0{idx + 1}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)',
                        fontWeight: 800,
                        color: '#f8fafc',
                        lineHeight: 1.25,
                      }}
                    >
                      {item.role}
                    </h3>

                    <div
                      style={{
                        fontFamily: 'var(--font-tech)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--accent-cyan)',
                        marginBottom: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>{item.org}</span>
                    </div>

                    <p
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.92rem',
                        lineHeight: 1.65,
                        marginBottom: '20px',
                      }}
                    >
                      {item.description}
                    </p>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {item.badges.map((b, bIdx) => (
                        <span key={bIdx} className="tech-badge">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
