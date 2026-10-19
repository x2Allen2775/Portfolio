import { useState, useEffect } from 'react';
import { Copy, Check, Clock, Send, Globe, Mail, ArrowUp, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentUtc, setCurrentUtc] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: 'DRIVETRAINS & GEARBOXES',
    message: '',
  });

  const emailPlaceholder = "engineer@mechanema.com";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setCurrentUtc(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    sound.playRelay();
    navigator.clipboard.writeText(emailPlaceholder).then(() => {
      setCopied(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.85 },
        colors: ['#ff9f1c', '#38bdf8', '#ffffff'],
      });
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sound.playRelay();
    setFormSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#ff9f1c', '#10b981', '#38bdf8'],
    });
    setTimeout(() => {
      setFormData({ name: '', email: '', scope: 'DRIVETRAINS & GEARBOXES', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="section-wrapper" style={{ paddingBottom: '40px', backgroundColor: '#07080a' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <div className="section-tag">CHAPTER 05 // COLLABORATION</div>
          <h2
            className="section-title"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
              lineHeight: 1,
            }}
          >
            LET'S BUILD IN <span style={{ color: 'var(--accent-amber)' }}>STEEL</span> & <span style={{ color: 'var(--accent-cyan)' }}>MOTION</span>.
          </h2>
          <p className="section-subtitle">
            Available for principal mechanical design, R&D engineering contracts, finite element consultancy, and senior product leadership.
          </p>
        </div>

        {/* Action Row: Email Magnet & Live Clock */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {/* Email Copy Card */}
          <div
            className="glass-panel"
            style={{
              padding: '28px',
              border: '1px solid rgba(255, 159, 28, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
                DIRECT CAD & ENG DISPATCH
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                  fontWeight: 700,
                  color: '#fff',
                  margin: '12px 0 20px 0',
                  wordBreak: 'break-all',
                }}
              >
                {emailPlaceholder}
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span>{copied ? 'EMAIL COPIED TO CLIPBOARD!' : 'COPY EMAIL ADDRESS'}</span>
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>

          {/* Real-time Mechanical Clock & Status */}
          <div
            className="glass-panel"
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                <Clock size={16} />
                <span>CHRONOMETER // TELEMETRY CLOCK</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  fontWeight: 700,
                  color: '#f8fafc',
                  margin: '12px 0 4px 0',
                  letterSpacing: '0.05em',
                }}
              >
                {currentTime || '12:00:00'}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                UTC REFERENCE: {currentUtc || '12:00:00 UTC'}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(148, 163, 184, 0.1)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#10b981',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px #10b981' }} />
              <span>ACTIVE STATUS: ACCEPTING R&D INQUIRIES</span>
            </div>
          </div>
        </div>

        {/* Project Dispatch Form */}
        <div
          className="glass-panel"
          style={{
            padding: '36px',
            marginBottom: '64px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Terminal size={20} style={{ color: 'var(--accent-amber)' }} />
            <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
              TRANSMIT PROJECT SPECIFICATIONS
            </h3>
          </div>

          {formSubmitted ? (
            <div
              style={{
                padding: '32px',
                textAlign: 'center',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #10b981',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <Check size={40} style={{ color: '#10b981', margin: '0 auto 12px auto' }} />
              <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.2rem', color: '#fff', marginBottom: '6px' }}>
                SPECIFICATION TRANSMISSION SUCCESSFUL
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Your engineering brief has been logged into the CAD pipeline. A reply with feasibility analysis will follow shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                    YOUR NAME // ORGANIZATION
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Elena Vance // Apex Dynamics"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(9, 11, 14, 0.8)',
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                      fontFamily: 'var(--font-tech)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                    CONTACT EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@apexdynamics.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(9, 11, 14, 0.8)',
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                      fontFamily: 'var(--font-tech)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                  PROJECT DOMAIN & SCOPE
                </label>
                <select
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: '#090b0e',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    fontFamily: 'var(--font-tech)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                >
                  <option value="DRIVETRAINS & GEARBOXES">DRIVETRAINS & PRECISION GEARBOXES</option>
                  <option value="5-AXIS CNC & CAM MACHINING">5-AXIS CNC & CAM MACHINING CELL</option>
                  <option value="CFD & TURBOMACHINERY">CFD & TURBOMACHINERY FLUIDICS</option>
                  <option value="ROBOTIC KINEMATICS & EXOSKELETON">ROBOTIC KINEMATICS & EXOSKELETON</option>
                  <option value="FEA STRUCTURAL AUDIT">FEA NON-LINEAR STRUCTURAL AUDIT</option>
                  <option value="FULL-TIME SENIOR ROLE">FULL-TIME PRINCIPAL / SENIOR ROLE</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                  SPECIFICATION DETAILS / BOUNDARY CONDITIONS
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Outline payload, torque requirements, operating environment, CAD standards, or timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(9, 11, 14, 0.8)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    fontFamily: 'var(--font-tech)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ alignSelf: 'flex-start' }}
              >
                <span>TRANSMIT SPECIFICATION</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>

        {/* Footer Bottom Bar: Socials & Back to Top */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(148, 163, 184, 0.12)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            © {new Date().getFullYear()} MECHANEMA®. CRAFTED IN STEEL, INVOLUTE GEARS & CODE.
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {[
              { label: 'LINKEDIN', href: 'https://linkedin.com' },
              { label: 'GRABCAD', href: 'https://grabcad.com' },
              { label: 'GITHUB', href: 'https://github.com' },
              { label: 'RESEARCHGATE', href: 'https://researchgate.net' },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  transition: 'color 0.2s',
                }}
                className="footer-link"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={scrollToTop}
              title="Return to Top of Blueprint"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                color: 'var(--accent-amber)',
                width: '36px',
                height: '36px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Back to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--accent-amber) !important;
        }
      `}</style>
    </footer>
  );
}
