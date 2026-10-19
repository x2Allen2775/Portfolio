import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Cpu } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { label: '01 // MANIFESTO', href: '#manifesto' },
    { label: '02 // BLUEPRINTS', href: '#projects' },
    { label: '03 // CAPABILITIES', href: '#capabilities' },
    { label: '04 // TIMELINE', href: '#timeline' },
    { label: '05 // CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled
            ? 'rgba(9, 11, 14, 0.85)'
            : 'linear-gradient(180deg, rgba(9, 11, 14, 0.9) 0%, transparent 100%)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(148, 163, 184, 0.12)' : '1px solid transparent',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '76px',
          }}
        >
          {/* Logo & Mechanical Mark */}
          <a
            href="#"
            onClick={() => sound.playClick()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(255, 159, 28, 0.12)',
                border: '1px solid rgba(255, 159, 28, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-amber)',
              }}
            >
              <Cpu size={20} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: '#fff',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                MECHANEMA<span style={{ color: 'var(--accent-amber)', fontSize: '0.9rem' }}>®</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--accent-cyan)',
                  letterSpacing: '0.12em',
                  marginTop: '3px',
                }}
              >
                CAD / KINEMATICS / FEA
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onMouseEnter={() => sound.playClick()}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                }}
                className="nav-link-item"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Controls: Sound Toggle & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Status Indicator */}
            <div
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '100px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#10b981',
              }}
              className="status-badge"
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 8px #10b981',
                }}
              />
              <span>R&D ONLINE</span>
            </div>

            {/* Audio Toggle Button */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Unmute Mechanical Sound Effects' : 'Mute Sound Effects'}
              className="sound-toggle-btn"
              aria-label="Sound Toggle"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                sound.playRelay();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="mobile-menu-btn"
              style={{
                display: 'none',
                background: 'rgba(18, 24, 33, 0.7)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                color: '#fff',
                width: '40px',
                height: '40px',
                borderRadius: '4px',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'rgba(9, 11, 14, 0.98)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '32px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'center' }}>
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            style={{
              marginTop: '48px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--accent-amber)',
              letterSpacing: '0.1em',
            }}
          >
            // MECHANEMA PORTFOLIO TEMPLATE REV 4.2
          </div>
        </div>
      )}

      <style>{`
        .nav-link-item:hover {
          color: var(--accent-amber) !important;
        }
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .status-badge {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          .status-badge {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
