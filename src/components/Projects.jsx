import { useState } from 'react';
import { ArrowUpRight, Cpu, Compass, Layers } from 'lucide-react';
import { sound } from '../utils/sound';
import CaseStudyModal from './CaseStudyModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const projectsData = [
    {
      id: 'torq-x',
      title: 'TORQ-X // HIGH-REDUCTION PLANETARY TRANSMISSION',
      category: 'TRANSMISSION & DRIVETRAINS',
      badge: 'ROBOTIC ACTUATION',
      image: '/images/gearbox.jpg',
      summary: 'Ultra-compact compound planetary gear actuator for 6-DOF collaborative robotic arms. Involute helical teeth profile optimization in SolidWorks with high-cycle contact stress analysis in ANSYS.',
      stats: [
        { label: 'REDUCTION RATIO', value: '120:1' },
        { label: 'PEAK TORQUE', value: '480 N·m' },
        { label: 'BACKLASH', value: '< 1.1 arcmin' },
        { label: 'EFFICIENCY', value: '96.4%' },
      ],
      tools: ['SolidWorks 2025', 'ANSYS Mechanical', 'KISSsoft', 'Ti-6Al-4V', 'Wire EDM'],
      caseStudy: {
        challenge: 'Collaborative robotics require high torque density without the backlash inherent to standard multi-stage spur gearboxes, while maintaining a mass limit under 2.2 kg.',
        equations: 'Lewis Bending: σ_b = (W_t) / (F · m · Y)  |  Hertz Contact: σ_c = Z_H · Z_E · √((W_t / (d_1 · b)) · ((u + 1) / u))',
        physicsDetails: 'Analyzed dynamic contact stress on sun and planet interfaces at 1,500 RPM input. Implemented tooth profile crowning (2.4 µm tip relief) to eliminate edge loading caused by structural deflection under peak torsional load.',
        analysis: 'FEA mesh convergence test yielded peak von Mises stress of 542 MPa in the titanium planet carrier pins, well below the 880 MPa yield limit, giving a safety factor of n = 1.62 under worst-case emergency stop shock.',
        deliverables: [
          'Full parametric SolidWorks assembly with AGMA 11 tolerance stackup',
          'Finite element non-linear contact analysis in ANSYS Workbench',
          'Physical dynamometer efficiency benchmark validation (96.4% at 300 Nm)',
          'Complete manufacturing drawing set with ASME Y14.5M GD&T'
        ]
      }
    },
    {
      id: 'aero-cell',
      title: 'AERO-CELL // 5-AXIS AUTONOMOUS CNC MILLING CELL',
      category: 'ADVANCED MACHINING & CAM',
      badge: 'AEROSPACE MANUFACTURING',
      image: '/images/cnc.jpg',
      summary: 'Automated 5-axis CNC machining cell engineered for titanium Ti-6Al-4V aerospace impellers. Integrates supercritical cryogenic CO2 mist cooling with real-time vibration harmonic suppression.',
      stats: [
        { label: 'SPINDLE SPEED', value: '24,000 RPM' },
        { label: 'REPEATABILITY', value: '±0.003 mm' },
        { label: 'CYCLE REDUCTION', value: '-42%' },
        { label: 'SURFACE FINISH', value: 'Ra 0.18 µm' },
      ],
      tools: ['Siemens NX CAM', 'Mastercam', 'Renishaw Probing', 'Heidenhain CNC', 'Supercritical CO2'],
      caseStudy: {
        challenge: 'Thin-walled titanium blisk and impeller blades suffer from catastrophic chatter and work-hardening when machined with conventional flood coolant at high feed rates.',
        equations: 'Stability Lobe: b_lim = -1 / (2 · K_s · Re[G(jω)])  |  Cutting Power: P_c = (F_c · v_c) / (60 · 10^3)',
        physicsDetails: 'Derived modal frequency response functions (FRF) through tap testing of the spindle-toolholder assembly. Engineered custom 5-axis toolpaths avoiding regenerative chatter pockets while applying -78°C supercritical CO2 directly to the shear zone.',
        analysis: 'Tool life extended by 310% compared to standard wet emulsion milling. Thermal imaging confirmed cutting zone interface temperature dropped from 720°C to 185°C, preventing alpha-case formation.',
        deliverables: [
          '5-axis simultaneous blade finishing toolpath with zero collision envelope',
          'Post-processor optimization for 5-axis DMG MORI machining center',
          'In-process Renishaw automated touch-probe coordinate calibration routines',
          'Metrology CMM inspection report meeting AS9100 aerospace compliance'
        ]
      }
    },
    {
      id: 'vortex-h',
      title: 'VORTEX-H // 850 kW FRANCIS HYDRO-TURBINE',
      category: 'TURBOMACHINERY & CFD',
      badge: 'CLEAN ENERGY & FLUIDICS',
      image: '/images/turbine.jpg',
      summary: 'Parametric 3D blade profiling and multiphase CFD simulation in OpenFOAM & ANSYS Fluent for an 850 kW Francis hydro-turbine runner in high-head alpine installations.',
      stats: [
        { label: 'RATED HEAD', value: '180 m' },
        { label: 'FLOW RATE', value: '0.52 m³/s' },
        { label: 'HYDRAULIC EFF.', value: '94.8%' },
        { label: 'POWER OUTPUT', value: '850 kW' },
      ],
      tools: ['OpenFOAM', 'ANSYS CFX / Fluent', 'BladeGen', 'CFTurbo', 'SS 316L'],
      caseStudy: {
        challenge: 'Design a high-head runner resistant to cavitation erosion across a ±35% seasonal discharge fluctuation, avoiding blade leading-edge flow separation.',
        equations: 'Euler Turbine Eq: P = ρ · Q · (u_1 · c_u1 - u_2 · c_u2)  |  Thoma Cavitation: σ = (H_atm - H_vap - H_s) / H_net',
        physicsDetails: 'Constructed an unstructured polyhedral mesh of 14.8 million cells. Simulated cavitation inception using the Schnerr-Sauer model with k-ω SST turbulence modeling.',
        analysis: 'Adjusted guide vane wrap angles to preserve radial vortex uniformity in the draft tube, eliminating low-frequency pressure pulsations (vortex rope) at partial load (50% Q_rated).',
        deliverables: [
          '3D parametric blade coordinates exported to 5-axis CAM mill',
          'Multiphase CFD pressure distribution & velocity streamline contours',
          'Fluid-Structure Interaction (FSI) cyclic fatigue endurance proof',
          'Field commissioned at alpine power station; verified 94.8% peak efficiency'
        ]
      }
    },
    {
      id: 'exoskeleton',
      title: 'KINEMATIX // 6-DOF BIOMECHANICAL ARM EXOSKELETON',
      category: 'ROBOTICS & BIOMECHANICS',
      badge: 'WEARABLE ROBOTICS',
      image: '/images/exoskeleton.jpg',
      summary: 'Active upper-extremity industrial assistance exoskeleton featuring prepreg carbon-fiber monocoque linkages and magneto-rheological variable impedance joint dampers.',
      stats: [
        { label: 'TOTAL SYSTEM MASS', value: '3.2 kg' },
        { label: 'ASSIST TORQUE', value: '35 N·m' },
        { label: 'LUMBAR STRAIN', value: '-48%' },
        { label: 'FATIGUE LIFE', value: '> 500k Cycles' },
      ],
      tools: ['Altair OptiStruct', 'PTC Creo', 'MATLAB/Simulink', 'Carbon Prepreg', 'CNC 7075-T6'],
      caseStudy: {
        challenge: 'Factory assembly technicians lifting tools overhead experience chronic shoulder musculoskeletal fatigue. The exoskeleton had to weigh under 3.5 kg while transferring dynamic loads safely to the pelvis.',
        equations: 'Lagrangian Kinematics: d/dt(∂L/∂q̇_i) - ∂L/∂q_i = Q_i  |  Beam Deflection: EI · (d²w/dx²) = M(x)',
        physicsDetails: 'Formulated inverse dynamics for human arm kinematics across 6 DOFs. Performed topology optimization on load-bearing aluminum 7075-T6 clevises to remove non-essential material.',
        analysis: 'FEA showed safety factor n = 2.4 under maximum 120 kg fall arresting load. Surface EMG testing on 12 participants validated a 48% reduction in anterior deltoid and trapezius muscle fatigue.',
        deliverables: [
          'Carbon-fiber autoclaved sandwich layup tooling patterns',
          'Magneto-rheological damper control loop firmware on STM32 MCU',
          'Biomechanical compliance clinical test data set',
          'US Provisional Patent application for ergonomic gravity compensation link'
        ]
      }
    }
  ];

  const categories = ['ALL', 'TRANSMISSION & DRIVETRAINS', 'ADVANCED MACHINING & CAM', 'TURBOMACHINERY & CFD', 'ROBOTICS & BIOMECHANICS'];

  const filteredProjects = activeFilter === 'ALL'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">CHAPTER 02 // ENGINEERING BLUEPRINTS</div>
          <h2 className="section-title">FEATURED CAPSTONE PROJECTS</h2>
          <p className="section-subtitle">
            Rigorous engineering artifacts combining parametric CAD, finite element validation, numerical flow solvers, and physical production prototypes.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playClick();
                setActiveFilter(cat);
              }}
              style={{
                padding: '8px 16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                borderRadius: 'var(--radius-sm)',
                border: activeFilter === cat ? '1px solid var(--accent-amber)' : '1px solid rgba(148, 163, 184, 0.18)',
                background: activeFilter === cat ? 'rgba(255, 159, 28, 0.15)' : 'rgba(15, 19, 24, 0.7)',
                color: activeFilter === cat ? 'var(--accent-amber)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="glass-panel"
              style={{
                padding: '36px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '36px',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Left Column: Technical Narrative & Metrics */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  <span className="tech-badge amber">
                    0{index + 1} // {project.badge}
                  </span>
                  <span className="tech-badge cyan">
                    <Compass size={12} />
                    CAD STAMPED
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.15,
                    marginBottom: '16px',
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.96rem',
                    lineHeight: 1.7,
                    marginBottom: '28px',
                  }}
                >
                  {project.summary}
                </p>

                {/* Metrics Matrix */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                    marginBottom: '28px',
                  }}
                >
                  {project.stats.map((s, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        background: 'rgba(9, 11, 14, 0.7)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(148, 163, 184, 0.1)',
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-dim)' }}>
                        {s.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-amber)', marginTop: '2px' }}>
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CAD & Tooling Badges */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  {project.tools.slice(0, 4).map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid rgba(148, 163, 184, 0.15)',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    sound.playRelay();
                    setSelectedProject(project);
                  }}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span>VIEW FULL BLUEPRINT DOSSIER</span>
                  <ArrowUpRight size={18} />
                </button>
              </div>

              {/* Right Column: High-Res CAD Render / Blueprint Preview */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  height: '380px',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="project-image-preview"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 60%, rgba(9, 11, 14, 0.85) 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Blueprint Overlay Label */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    background: 'rgba(9, 11, 14, 0.85)',
                    backdropFilter: 'blur(8px)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                  }}
                >
                  <Layers size={14} />
                  <span>3D CAD EXPLODED MODEL // RESOLUTION 8K</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <style>{`
        .project-image-preview:hover {
          transform: scale(1.03);
        }
      `}</style>
    </section>
  );
}
