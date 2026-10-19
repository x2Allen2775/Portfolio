import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy, ExternalLink, Menu, X, Code2 } from "lucide-react";
import WebGLScene from "@/components/WebGLScene";
import "@/App.css";

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--amber)' }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--amber)' }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const projects = [
  { 
    id: "01", 
    type: "EDGE AI & HEALTHCARE CV", 
    title: "Anemia-Screen", 
    meta: "PyTorch / timm / FastAPI", 
    stat: "5,172 Clinical Img", 
    video: "/videos/anemia.mp4",
    image: "/images/forone.png", 
    fallbackImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/x2Allen2775/ForOne--Cline-Submission",
    linkedinPost: "https://lnkd.in/p/gviN3abP",
    copy: "A local-first, offline-capable clinical decision-support pipeline that non-invasively screens for anemia from images of the palpebral conjunctiva (70% weight) and palm (30% weight). Features automated quality gating (Laplacian blur variance, brightness clipping), 2D spatial Grad-CAM interpretability, and a WHO/MoHFW-aligned Clinical NLP symptom parser with 55/55 automated tests passed." 
  },
  { 
    id: "02", 
    type: "BIOMECHANICS & KINEMATICS", 
    title: "SPJURY", 
    meta: "MediaPipe / OpenCV / Flask", 
    stat: "ICC 15° Compliance", 
    video: "/videos/spjury.mp4",
    image: "/images/spjury.png", 
    fallbackImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/x2Allen2775/Spjury",
    linkedinPost: "https://lnkd.in/p/gf96Nsr5",
    copy: "A computer-vision sports analytics platform performing real-time pose estimation to identify injury vulnerabilities in Cricket and Tennis. Implements an ICC 15° Rule Legality Engine tracking dynamic elbow extension angles across 8 delivery phases, alongside knee joint strain and trunk lateral tilt analysis to predict rotator cuff and lumbar disc injuries." 
  },
  { 
    id: "03", 
    type: "DOCUMENT AI & SPATIAL OCR", 
    title: "SplitSnap", 
    meta: "Donut / EasyOCR / Next.js", 
    stat: "<1 Paisa Balance", 
    video: "/videos/nalafaad.mp4",
    image: "/images/splitsnap.png", 
    fallbackImage: "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/x2Allen2775/Nalafaad-ML-track-pipeline",
    linkedinPost: "https://www.linkedin.com/in/hardik-singh-38617b374",
    copy: "A smart bill-splitting platform pairing a 3-zone spatial layout parser with an end-to-end visual document transformer (Naver Donut Swin-B + mBART) fine-tuned on augmented Indian dining receipts. Computes proportional tax (CGST/SGST), service charges, and discounts with mathematical fairness equations and single-paisa rounding balance reconciliation." 
  },
  { 
    id: "04", 
    type: "EXPLAINABLE AI & CLINICAL EDGE", 
    title: "InsuLens", 
    meta: "MATLAB / ResNet-50", 
    stat: "100% Edge Offline", 
    video: "/videos/insulens.mp4",
    image: "/images/insulens.png", 
    fallbackImage: "https://images.unsplash.com/photo-1769152683420-f4eff91cb30b?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/x2Allen2775/insulens",
    linkedinPost: "https://www.linkedin.com/in/hardik-singh-38617b374",
    demo: "https://youtu.be/lZZk4O9dX4A",
    copy: "A hybrid diagnostic pipeline for early rural screening of Diabetic Retinopathy across 5 ICDR severity classes. Engineered a Hybrid Fail-Safe Switch combining ResNet-50 (83.9% validation accuracy) with classical morphological mathematical algorithms for lesion detection (Microaneurysms, Hemorrhages), enforcing automatic fallback whenever deep learning confidence falls below 65%." 
  },
  { 
    id: "05", 
    type: "FINANCIAL NLP & CACHING", 
    title: "FinNews Pipeline", 
    meta: "FastAPI / FinBERT / SQLite", 
    stat: "<2ms Response Time", 
    image: "/images/newsfetcher.jpeg", 
    fallbackImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/x2Allen2775/News-fetcher-and-filter",
    linkedinPost: "https://lnkd.in/p/gQXWx35p",
    copy: "An automated financial news ingestion, NLP enrichment, and low-latency delivery system. Runs an APScheduler background worker every 15 minutes to ingest live market feeds via NewsAPI, computing ProsusAI/FinBERT sentiment scoring and spaCy named entity extraction (organizations, countries, market drivers). Precomputes queries into high-performance SQLite caching to eliminate real-time inference lag, delivering complex filtered multi-sector queries in sub-2ms." 
  },
  { 
    id: "06", 
    type: "DISTRIBUTED PLATFORM & MOBILE APP", 
    title: "WANDR", 
    meta: "FastAPI / Postgres / Flutter", 
    stat: "DPDP-Compliant KYC", 
    video: "/videos/wandr.mp4",
    image: "/images/wandr.png", 
    fallbackImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/x2Allen2775/wandr-backend",
    linkedinPost: "https://lnkd.in/p/gY8z3SKq",
    copy: "A social travel companion platform built around interest-based trip matching, community coordination, and multi-tier identity verification. Implemented a Tri-Level Trust & Safety (KYC) in-memory DPDP-compliant verification pipeline utilizing OCR and selfie matching without permanent raw media retention. Backed by FastAPI, SQLAlchemy 2.0, PostgreSQL, Docker, and Flutter with Firebase phone OTP authorization." 
  },
];

const capabilities = [
  "PYTORCH & COMPUTER VISION", 
  "BIOMECHANICS & KINEMATICS", 
  "FINANCIAL NLP & FINBERT", 
  "DOCUMENT AI & SPATIAL OCR", 
  "HIGH-THROUGHPUT BACKENDS", 
  "DISTRIBUTED MOBILE APPS"
];

const capabilitySubtitles = [
  "MobileNetV3 / ResNet-50 / OpenCV / Grad-CAM / timm", 
  "MediaPipe / Joint angle kinematics / ICC 15° rule", 
  "ProsusAI FinBERT / spaCy NER / APScheduler / SQLite cache", 
  "Donut Transformer / EasyOCR / Apple Vision / <1 paisa balance", 
  "FastAPI / PostgreSQL / Docker / Uvicorn / Async pipelines", 
  "Flutter (Dart) / Firebase Auth / DPDP-Compliant KYC / Render"
];

const journey = [
  { 
    year: "2026 — PRESENT", 
    title: "Bachelor of Technology (B.Tech)", 
    place: "Indian Institute of Technology, Guwahati", 
    note: "Pursuing engineering with focus on AI/ML, computer vision, and physical-world systems." 
  }, 
  { 
    year: "2025 — 2026", 
    title: "B.Tech in Computer Engineering", 
    place: "Delhi Technological University (DTU / DCE)", 
    note: "Rigorous foundation in computer architecture, object-oriented design, and algorithms." 
  }, 
  { 
    year: "2024", 
    title: "Anemia-Screen & Medical AI Pipelines", 
    place: "Independent R&D / Open Source", 
    note: "Engineered dual-modality edge screening model trained on 5,172 clinical images." 
  },
  { 
    year: "2023", 
    title: "Academic Excellence & High School", 
    place: "Amity International & Seth Anandram Jaipuria", 
    note: "Graduated CBSE Class X with 97%; Class XII in Science (PCM)." 
  }
];

const formatClock = () => new Intl.DateTimeFormat("en-IN", { 
  hour: "2-digit", 
  minute: "2-digit", 
  second: "2-digit", 
  hour12: false, 
  timeZone: "Asia/Kolkata" 
}).format(new Date());

function App() {
  const [loading, setLoading] = useState(true); 
  const [count, setCount] = useState(0); 
  const [menu, setMenu] = useState(false); 
  const [activeProject, setActiveProject] = useState(null); 
  const [scroll, setScroll] = useState(0); 
  const [copied, setCopied] = useState(false); 
  const [copyError, setCopyError] = useState(false);

  const personalEmail = "hardiksingh2775@gmail.com";

  useEffect(() => { 
    const timer = setInterval(() => setCount((n) => { 
      if (n >= 100) { 
        clearInterval(timer); 
        setTimeout(() => setLoading(false), 420); 
        return 100; 
      } 
      return n + 4; 
    }), 35); 
    return () => clearInterval(timer); 
  }, []);

  useEffect(() => { 
    const update = () => setScroll(window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)); 
    window.addEventListener("scroll", update, { passive: true }); 
    update(); 
    return () => window.removeEventListener("scroll", update); 
  }, []);

  useEffect(() => { 
    const move = (event) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move); 
    return () => window.removeEventListener("pointermove", move); 
  }, []);

  const [time, setTime] = useState(formatClock);
  useEffect(() => { 
    const clock = setInterval(() => setTime(formatClock()), 1000); 
    return () => clearInterval(clock); 
  }, []);

  const copyEmail = async () => { 
    setCopyError(false); 
    try { 
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(personalEmail); 
      } else {
        throw new Error("clipboard unavailable"); 
      }
      setCopied(true); 
    } catch { 
      const input = document.createElement("textarea"); 
      input.value = personalEmail; 
      input.style.position = "fixed"; 
      input.style.opacity = "0"; 
      document.body.appendChild(input); 
      input.select(); 
      const fallbackWorked = document.execCommand("copy"); 
      input.remove(); 
      if (fallbackWorked) setCopied(true); 
      else setCopyError(true); 
    } 
    setTimeout(() => { 
      setCopied(false); 
      setCopyError(false); 
    }, 1800); 
  };

  return (
    <div className="mechanema" data-testid="mechanema-page">
      {/* Cinematic Assembly Preloader */}
      {loading && (
        <div className="preloader" data-testid="preloader">
          <div className="preloader-top">
            <span>HARDIK SINGH®</span>
            <span>IIT GUWAHATI // EST. 2026</span>
          </div>
          <div className="preloader-word">
            HARDIK<span>®</span>
          </div>
          <div className="preloader-bottom">
            <span>INITIALIZING KINEMATIC & AI SYSTEMS</span>
            <strong>{String(count).padStart(3, "0")} %</strong>
          </div>
        </div>
      )}

      {/* Trailing Cursor Orb */}
      <div className="cursor-orb" aria-hidden="true" />

      {/* Navigation Bar */}
      <header className="mega-nav" data-testid="site-header">
        <a className="mega-logo" href="#top" data-testid="logo-link">
          <span className="gear-logo">✳</span>
          <span>
            HARDIK SINGH<sup>®</sup>
            <small>IIT GUWAHATI / AI & KINEMATICS</small>
          </span>
        </a>
        <nav className={menu ? "mega-links open" : "mega-links"} data-testid="primary-navigation">
          <a href="#story" onClick={() => setMenu(false)} data-testid="nav-story">01 / STORY</a>
          <a href="#projects" onClick={() => setMenu(false)} data-testid="nav-projects">02 / PROJECTS</a>
          <a href="#capabilities" onClick={() => setMenu(false)} data-testid="nav-capabilities">03 / CAPABILITIES</a>
          <a href="#journey" onClick={() => setMenu(false)} data-testid="nav-journey">04 / JOURNEY</a>
          <a href="#contact" onClick={() => setMenu(false)} data-testid="nav-contact">05 / CONTACT</a>
        </nav>
        <button 
          className="menu-toggle" 
          onClick={() => setMenu(!menu)} 
          data-testid="mobile-menu-button" 
          aria-label="Toggle menu"
        >
          {menu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main>
        {/* Hero Section with 3D WebGL Torus Knot & Gear Sculpture */}
        <section className="mega-hero" id="top" data-testid="hero-section">
          <div className="hero-noise" />
          <div className="hero-text">
            <p className="chapter-label">
              HARDIK SINGH® <span>///</span> EDGE AI / BIOMECHANICS / SYSTEMS
            </p>
            <h1>
              HARDIK<br />
              <i>SINGH</i><br />
              ENGINEER<span>®</span>
            </h1>
            <p className="hero-sub">
              Undergraduate at IIT Guwahati building local-first, low-latency intelligence — from computer-vision biomechanics and edge clinical screening to high-throughput financial pipelines.
            </p>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a className="arrow-link" href="#projects" data-testid="hero-story-link">
                EXPLORE SYSTEMS <ArrowDown size={15} />
              </a>
              <a 
                className="arrow-link" 
                href="https://github.com/x2Allen2775" 
                target="_blank" 
                rel="noreferrer"
                style={{ borderColor: 'var(--steel)', color: 'var(--steel)' }}
              >
                GITHUB REPOS <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="scene-wrap">
            <WebGLScene progress={scroll} />
            <span className="scene-note">LIVE SCULPTURE / SCROLL TO DISASSEMBLE</span>
          </div>

          <div className="hero-meta">
            <span>IIT GUWAHATI / GHAZIABAD</span>
            <span>26°11′N, 91°41′E</span>
            <span className="hero-scroll">
              SCROLL <span className="scroll-line" />
            </span>
          </div>
        </section>

        {/* Infinite Kinetic Marquee */}
        <div className="marquee" data-testid="marquee-section">
          <div>
            COMPUTER VISION <i>✳</i> BIOMECHANICS & KINEMATICS <i>✳</i> FINANCIAL NLP & FINBERT <i>✳</i> EDGE AI IN HEALTHCARE <i>✳</i> HIGH-THROUGHPUT FASTAPI <i>✳</i> FLUTTER & DART <i>✳</i> IIT GUWAHATI <i>✳</i>&nbsp;
            COMPUTER VISION <i>✳</i> BIOMECHANICS & KINEMATICS <i>✳</i> FINANCIAL NLP & FINBERT <i>✳</i> EDGE AI IN HEALTHCARE <i>✳</i> HIGH-THROUGHPUT FASTAPI <i>✳</i> FLUTTER & DART <i>✳</i> IIT GUWAHATI <i>✳</i>&nbsp;
            COMPUTER VISION <i>✳</i> BIOMECHANICS & KINEMATICS <i>✳</i> FINANCIAL NLP & FINBERT <i>✳</i> EDGE AI IN HEALTHCARE <i>✳</i> HIGH-THROUGHPUT FASTAPI <i>✳</i> FLUTTER & DART <i>✳</i> IIT GUWAHATI <i>✳</i>&nbsp;
            COMPUTER VISION <i>✳</i> BIOMECHANICS & KINEMATICS <i>✳</i> FINANCIAL NLP & FINBERT <i>✳</i> EDGE AI IN HEALTHCARE <i>✳</i> HIGH-THROUGHPUT FASTAPI <i>✳</i> FLUTTER & DART <i>✳</i> IIT GUWAHATI <i>✳</i>&nbsp;
          </div>
        </div>

        {/* Section 01: Manifesto / Story */}
        <section className="manifesto-block" id="story" data-testid="story-section">
          <div className="chapter-label">01 / A POINT OF VIEW</div>
          <div className="manifesto-copy">
            <p className="manifesto-kicker">ENGINEERING IS NOT JUST ABOUT RUNNING CODE.</p>
            <h2>
              It is about<br />
              <em>orchestrating logic</em><br />
              with physical reality.
            </h2>
            <p className="manifesto-body">
              Whether tracking dynamic elbow joint extension in sports biomechanics under strict ICC regulations, isolating micro-capillary beds under clinical noise, or parsing complex receipt layouts with sub-paisa mathematical fairness — I bridge computational algorithms with real-world physical constraints.
            </p>
          </div>
          <div className="manifesto-aside">
            <span>PRINCIPLE / 01</span>
            <strong>LOCAL-FIRST &<br />DETERMINISTIC.</strong>
            <span>SCROLL TO CONTINUE ↓</span>
          </div>
        </section>

        {/* Section 02: Selected Systems (Sticky Stacking Project Cards) */}
        <section className="project-stack" id="projects" data-testid="projects-section">
          <div className="section-intro">
            <div className="chapter-label">02 / SELECTED SYSTEMS</div>
            <h2>
              Things I’ve<br />
              <em>put in motion.</em>
            </h2>
            <p>Six production-ready engineering architectures built from first principles.</p>
          </div>

          <div className="cards">
            {projects.map((project) => (
              <article className="case-card" key={project.id} data-testid={`project-card-${project.id}`}>
                <div className="case-image">
                  {project.video ? (
                    <video 
                      src={project.video} 
                      poster={project.image}
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      preload="metadata"
                      aria-label={`${project.title} live demonstration video`}
                    />
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      onError={(e) => {
                        if (e.target.src !== project.fallbackImage) {
                          e.target.src = project.fallbackImage;
                        }
                      }}
                    />
                  )}
                  <span className="case-number">{project.id} / 06</span>
                  {project.video && (
                    <span className="case-badge">MOTION ACTIVE</span>
                  )}
                  <button 
                    className="case-open" 
                    onClick={() => setActiveProject(project)} 
                    data-testid={`open-project-${project.id}`}
                  >
                    INSPECT BLUEPRINT <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="case-info">
                  <div>
                    <p>{project.type}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="case-actions-group">
                    <div className="case-links">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="card-quick-link"
                          title="View GitHub Repository"
                        >
                          <GitHubIcon /> REPO ↗
                        </a>
                      )}
                      {project.linkedinPost && (
                        <a 
                          href={project.linkedinPost} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="card-quick-link"
                          title="View LinkedIn Discussion"
                        >
                          <LinkedInIcon /> LINKEDIN ↗
                        </a>
                      )}
                    </div>
                    <div className="case-right">
                      <span>{project.meta}</span>
                      <strong>{project.stat}</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 03: Capabilities Bento Grid */}
        <section className="capability-section" id="capabilities" data-testid="capabilities-section">
          <div className="chapter-label">03 / CAPABILITIES</div>
          <div className="capability-heading">
            <h2>
              THE<br />
              <em>TOOLKIT.</em>
            </h2>
            <p>From low-level C/C++ memory mechanics to deep neural architectures and distributed APIs.</p>
          </div>
          <div className="bento">
            {capabilities.map((capability, i) => (
              <div className={`bento-item bento-${i + 1}`} key={capability} data-testid={`capability-${i + 1}`}>
                <span>0{i + 1}</span>
                <strong>{capability}</strong>
                <small>{capabilitySubtitles[i]}</small>
              </div>
            ))}
          </div>
        </section>

        {/* Section 04: Journey & Honors Timeline */}
        <section className="journey-section" id="journey" data-testid="journey-section">
          <div className="chapter-label">04 / JOURNEY & EDUCATION</div>
          <div className="journey-heading">
            <h2>
              Learning by<br />
              <em>building.</em>
            </h2>
            <p>A timeline of institutions, deep-dive research architectures, and academic milestones.</p>
          </div>
          <div className="journey-list">
            {journey.map((item) => (
              <div className="journey-row" key={item.year}>
                <span>{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.place} — {item.note}</p>
                </div>
                <ArrowUpRight size={18} />
              </div>
            ))}
          </div>
        </section>

        {/* Section 05: Open Channel / Contact */}
        <section className="contact-mega" id="contact" data-testid="contact-section">
          <div className="chapter-label">05 / OPEN CHANNEL</div>
          <h2>
            LET’S BUILD<br />
            <em>SOMETHING</em><br />
            REAL.
          </h2>
          <div className="contact-actions">
            <a 
              href={`mailto:${personalEmail}`} 
              className="contact-mail" 
              data-testid="contact-email-link"
            >
              {personalEmail} <ArrowUpRight />
            </a>
            <button onClick={copyEmail} data-testid="copy-email-button">
              {copied ? <Check size={16} /> : <Copy size={16} />} 
              {copyError ? "COPY FAILED" : copied ? "COPIED" : "COPY EMAIL"}
            </button>
          </div>
          <div className="contact-footer">
            <span>© 2026 HARDIK SINGH // IIT GUWAHATI</span>
            <span>IST / {time}</span>
            <div>
              <a href="https://www.linkedin.com/in/hardik-singh-38617b374" target="_blank" rel="noreferrer" data-testid="linkedin-link">
                LINKEDIN <ExternalLink size={12} />
              </a>
              <a href="https://github.com/x2Allen2775" target="_blank" rel="noreferrer" data-testid="github-link">
                GITHUB <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Case Study Modal with direct GitHub & Demo links */}
      {activeProject && (
        <div 
          className="modal-backdrop" 
          onClick={() => setActiveProject(null)} 
          data-testid="case-study-modal"
          role="dialog"
          aria-modal="true"
        >
          <article className="case-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setActiveProject(null)} 
              data-testid="close-case-study"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
            {activeProject.video ? (
              <div className="modal-media-wrap">
                <video 
                  src={activeProject.video} 
                  poster={activeProject.image}
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  controls
                />
              </div>
            ) : (
              <img src={activeProject.image} alt={activeProject.title} />
            )}
            <div className="modal-copy">
              <p className="chapter-label">{activeProject.type}</p>
              <h2>{activeProject.title}</h2>
              <p>{activeProject.copy}</p>
              <strong>{activeProject.stat}</strong>
              
              <div style={{ marginTop: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      background: 'var(--void)',
                      color: 'var(--fog)',
                      textDecoration: 'none',
                      fontSize: '11px',
                      fontFamily: '"DM Mono", monospace',
                      border: '1px solid var(--line)',
                    }}
                  >
                    <GitHubIcon />
                    VIEW GITHUB REPO <ExternalLink size={12} />
                  </a>
                )}
                {activeProject.linkedinPost && (
                  <a
                    href={activeProject.linkedinPost}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      background: 'rgba(217, 149, 63, 0.1)',
                      color: 'var(--amber)',
                      textDecoration: 'none',
                      fontSize: '11px',
                      fontFamily: '"DM Mono", monospace',
                      border: '1px solid rgba(217, 149, 63, 0.3)',
                    }}
                  >
                    <LinkedInIcon />
                    VIEW LINKEDIN POST <ExternalLink size={12} />
                  </a>
                )}
                {activeProject.demo && (
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      background: 'var(--amber)',
                      color: 'var(--void)',
                      textDecoration: 'none',
                      fontSize: '11px',
                      fontWeight: 600,
                      fontFamily: '"DM Mono", monospace',
                    }}
                  >
                    WATCH DEMO <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

export default App;
