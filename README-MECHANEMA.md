# MECHANEMA® — Mechanical Engineering 3D Storytelling Portfolio Template

A cinematic 3D scroll-driven portfolio template crafted specifically for **Mechanical Engineers**, combining industrial aesthetics, real-time WebGL sculpture kinematics, editorial typography, sticky project card stacks, and interactive case study modals.

Based on the live preview template: [https://gearstory-3d.preview.emergentagent.com/](https://gearstory-3d.preview.emergentagent.com/)

---

## ⚡ Quick Start

### 1. Install & Run Locally
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```
The optimized bundle will be compiled into `dist/`, ready to deploy directly to **Vercel**, **GitHub Pages**, **Netlify**, or **AWS S3/CloudFront**.

---

## 🧩 Architectural Structure & File Map

```
portfolio/
├── index.html                   # SEO metadata, title, Google Fonts preconnect
├── package.json                 # Dependencies (React 19, Three.js, Lucide-react)
├── vite.config.js               # Fast Vite bundler with @ alias configuration
├── public/
│   ├── favicon.svg              # Precision mechanical gear brand favicon
│   └── images/
│       ├── project1.jpg         # Atlas Gearbox photography / CAD render
│       ├── project2.jpg         # 5-Axis CNC Cell 04 machining
│       ├── project3.jpg         # River Runner hydro-turbine
│       ├── project4.jpg         # The Old Lathe restoration
│       ├── gearbox.jpg          # 8K CAD planetary exploded diagram
│       ├── cnc.jpg              # Titanium blisk 5-axis milling
│       ├── turbine.jpg          # CFD velocity streamline runner
│       └── exoskeleton.jpg      # Biomechanical carbon arm & FEA stress
└── src/
    ├── main.jsx                 # React root mount point
    ├── App.jsx                  # Master portfolio component with all chapters
    ├── App.css                  # Custom design system, typography, and layout
    └── components/
        └── WebGLScene.jsx       # Three.js 3D Torus Knot & Gear sculpture
```

---

## 🛠️ How to Customize with Your Own Information

All your personal details and projects can be customized directly in `src/App.jsx`:

### 1. Changing Your Name, Title & Bio
In `src/App.jsx`:
- **Brand / Logo:** Edit line 133 (`MECHANEMA®` and `MECHANICAL ENGINEERING`)
- **Hero Title:** Edit line 160 (`MECH / ANICAL / ENGINEER®`)
- **Subtitle:** Edit line 167 (`I design the invisible logic that makes the physical world move better.`)
- **Location & Coordinates:** Edit line 180 (`CHENNAI / INDIA` and `13°04′N, 80°16′E`)

### 2. Customizing Projects & Case Studies
Locate the `projects` array around line 6 in `src/App.jsx`:
```javascript
const projects = [
  {
    id: "01",
    type: "POWER TRANSMISSION",
    title: "Atlas Gearbox",
    meta: "12-week / 2024",
    stat: "−28% weight",
    image: "/images/project1.jpg",
    copy: "A compact planetary gearbox concept tuned for a high-load, low-noise assembly..."
  },
  // Add or modify your projects here
];
```

### 3. Updating Capabilities & Tooling
Locate the `capabilities` and `capabilitySubtitles` arrays around line 43 in `src/App.jsx`:
```javascript
const capabilities = [
  "SOLIDWORKS",
  "ANSYS",
  "CFD / FEA",
  "CNC & CAM",
  "PROTOTYPING",
  "SYSTEMS THINKING"
];
```

### 4. Updating Experience & Journey
Locate the `journey` array around line 61 in `src/App.jsx`:
```javascript
const journey = [
  { year: "2024", title: "Design Engineering Intern", place: "Vector Motion Labs", note: "Built lighter actuators for automated assembly." },
  // Add your education, awards, and work history
];
```

### 5. Email & Social Links
In `src/App.jsx`:
- Change `hello@mechanema.engineering` to your personal email address (lines 98, 107, 281).
- Update the LinkedIn and GitHub URLs in the footer (lines 299–302).

---

## 🎨 Design Features Included

1. **Deterministic Cinematic Preloader:** Counts from `000` to `100%` with letter-by-letter reveal and smooth clip-path wipe.
2. **Scroll-Driven 3D WebGL Sculpture:** Three.js scene featuring an amber wireframe Torus Knot, steel planetary ring, and icosahedron core that dynamically twists, rotates, and disassembles along the scroll progress axis.
3. **Infinite Mechanical Marquee:** Smooth continuous ticker cycling through core engineering disciplines.
4. **Editorial Manifesto Section:** Storytelling typography with highlighted emphasis words and principle callouts.
5. **Sticky Project Card Stacking:** Projects stack like architectural drawings with subtle rotation angles on scroll.
6. **Detailed Case Study Modal:** Clean popup modal with project imagery, engineering challenge narrative, and quantitative metrics.
7. **Capabilities Bento Grid:** Responsive technical grid detailing CAD, FEA, CFD, and prototyping proficiencies.
8. **Journey Timeline:** Minimalist chronological roadmap of internships, academic credentials, and fabrication milestones.
9. **Magnetic Contact Footer:** One-click copy email button with clipboard fallback, live Indian Standard Time (IST) digital chronometer, and external social links.
10. **Fully Responsive:** Tested across desktop (1440px+), tablet, and mobile (390px) viewports with zero horizontal overflow.
