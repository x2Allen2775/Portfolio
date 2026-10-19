import { X, Download, ShieldCheck, CheckCircle2, Cpu, FileText } from 'lucide-react';
import { sound } from '../utils/sound';

export default function CaseStudyModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => {
        sound.playPneumatic();
        onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '0',
          position: 'relative',
          backgroundColor: '#0c1016',
          border: '1px solid rgba(255, 159, 28, 0.35)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 159, 28, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 28px',
            borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
            backgroundColor: 'rgba(15, 20, 27, 0.9)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backdropFilter: 'blur(12px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="tech-badge amber">
              <FileText size={12} />
              CAD BLUEPRINT DOSSIER
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              REV-2026.04 // CLASSIFIED R&D
            </span>
          </div>

          <button
            onClick={() => {
              sound.playPneumatic();
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              color: '#fff',
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            aria-label="Close Case Study"
          >
            <X size={18} />
          </button>
        </div>

        {/* Hero Image Banner */}
        <div style={{ position: 'relative', width: '100%', height: '360px', overflow: 'hidden' }}>
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, #0c1016 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '28px',
              right: '28px',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)', letterSpacing: '0.1em' }}>
              {project.category}
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                fontWeight: 800,
                color: '#ffffff',
                marginTop: '4px',
              }}
            >
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: '28px' }}>
          {/* Key Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              marginBottom: '32px',
            }}
          >
            {project.stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '14px 18px',
                  background: 'rgba(15, 20, 27, 0.8)',
                  border: '1px solid rgba(148, 163, 184, 0.12)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-amber)', marginTop: '2px' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Narrative Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* 1. Problem Statement & Constraints */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                01 // ENGINEERING CONSTRAINTS & SPECIFICATIONS
              </h4>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {project.caseStudy.challenge}
              </p>
            </div>

            {/* 2. Kinematic & Mathematical Breakdown */}
            <div
              style={{
                padding: '20px',
                background: 'rgba(9, 11, 14, 0.9)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={16} style={{ color: 'var(--accent-cyan)' }} />
                MATHEMATICAL GOVERNING EQUATIONS & PHYSICS
              </h4>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-amber)', background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '4px', margin: '10px 0' }}>
                {project.caseStudy.equations}
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                {project.caseStudy.physicsDetails}
              </p>
            </div>

            {/* 3. FEA Stress & Material Verification */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-amber)', marginBottom: '8px' }}>
                02 // FEA STRESS ANALYSIS & VALIDATION
              </h4>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '16px' }}>
                {project.caseStudy.analysis}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {project.caseStudy.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      background: 'rgba(15, 20, 27, 0.6)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(148, 163, 184, 0.1)',
                      fontSize: '0.85rem',
                      color: 'var(--text-main)',
                    }}
                  >
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-amber)' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Bill of Materials & Tooling */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' }}>
                03 // BILL OF MATERIALS & CAD STACK
              </h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {project.tools.map((tool, i) => (
                  <span key={i} className="tech-badge cyan">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '40px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(148, 163, 184, 0.15)',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
              <ShieldCheck size={18} />
              <span>TESTED & FABRICATED VALIDATION COMPLETE</span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                alert(`Exporting CAD specification package for ${project.title}... Package generated.`);
              }}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            >
              <Download size={16} />
              <span>EXPORT SPECIFICATION (STEP/PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
