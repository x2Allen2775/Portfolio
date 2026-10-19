import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Procedurally generate a detailed spur gear geometry with teeth, bore, and keyway
function createGearGeometry({ teeth = 18, radius = 2.5, depth = 0.5, toothHeight = 0.45, boreRadius = 0.6 }) {
  const shape = new THREE.Shape();
  const totalPoints = teeth * 4;
  const angleStep = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const baseAngle = i * angleStep;
    const a1 = baseAngle;
    const a2 = baseAngle + angleStep * 0.28;
    const a3 = baseAngle + angleStep * 0.55;
    const a4 = baseAngle + angleStep * 0.82;

    const rootR = radius - toothHeight * 0.55;
    const tipR = radius + toothHeight * 0.65;

    // Root arc
    const x1 = Math.cos(a1) * rootR;
    const y1 = Math.sin(a1) * rootR;
    // Tooth flank up
    const x2 = Math.cos(a2) * tipR;
    const y2 = Math.sin(a2) * tipR;
    // Tooth crest
    const x3 = Math.cos(a3) * tipR;
    const y3 = Math.sin(a3) * tipR;
    // Tooth flank down
    const x4 = Math.cos(a4) * rootR;
    const y4 = Math.sin(a4) * rootR;

    if (i === 0) {
      shape.moveTo(x1, y1);
    } else {
      shape.lineTo(x1, y1);
    }
    shape.lineTo(x2, y2);
    shape.lineTo(x3, y3);
    shape.lineTo(x4, y4);
  }
  shape.closePath();

  // Central shaft bore hole
  const hole = new THREE.Path();
  const holeSegments = 32;
  for (let i = 0; i <= holeSegments; i++) {
    const angle = (i / holeSegments) * Math.PI * 2;
    const hx = Math.cos(angle) * boreRadius;
    const hy = Math.sin(angle) * boreRadius;
    if (i === 0) hole.moveTo(hx, hy);
    else hole.lineTo(hx, hy);
  }

  // Keyway slot in bore
  const kwW = 0.16;
  const kwH = 0.14;
  hole.lineTo(-kwW / 2, boreRadius);
  hole.lineTo(-kwW / 2, boreRadius + kwH);
  hole.lineTo(kwW / 2, boreRadius + kwH);
  hole.lineTo(kwW / 2, boreRadius);
  hole.closePath();

  shape.holes.push(hole);

  // Lightening holes (for larger gears)
  if (teeth >= 20 && radius > 3.0) {
    const numPockets = 5;
    const pocketR = 0.65;
    const pocketDist = radius * 0.55;
    for (let p = 0; p < numPockets; p++) {
      const pAngle = (p / numPockets) * Math.PI * 2;
      const pcx = Math.cos(pAngle) * pocketDist;
      const pcy = Math.sin(pAngle) * pocketDist;
      const pocket = new THREE.Path();
      for (let s = 0; s <= 24; s++) {
        const sa = (s / 24) * Math.PI * 2;
        const sx = pcx + Math.cos(sa) * pocketR;
        const sy = pcy + Math.sin(sa) * pocketR;
        if (s === 0) pocket.moveTo(sx, sy);
        else pocket.lineTo(sx, sy);
      }
      pocket.closePath();
      shape.holes.push(pocket);
    }
  }

  const extrudeSettings = {
    steps: 1,
    depth: depth,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.06,
    bevelOffset: 0,
    bevelSegments: 3,
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();
  return geom;
}

export default function GearScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090b0e, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // MASTER GEAR ASSEMBLY GROUP
    const masterAssembly = new THREE.Group();
    scene.add(masterAssembly);

    // 1. PINION (Driving Gear) - Amber Wireframe & Core
    const pinionRadius = 2.0;
    const pinionTeeth = 12;
    const pinionGeom = createGearGeometry({
      teeth: pinionTeeth,
      radius: pinionRadius,
      depth: 0.6,
      toothHeight: 0.5,
      boreRadius: 0.5,
    });

    const amberMaterial = new THREE.MeshStandardMaterial({
      color: 0xff9f1c,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x5a2d04,
      emissiveIntensity: 0.4,
    });

    const amberWireMaterial = new THREE.MeshBasicMaterial({
      color: 0xffbf69,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const pinionMesh = new THREE.Mesh(pinionGeom, amberMaterial);
    const pinionWire = new THREE.Mesh(pinionGeom, amberWireMaterial);
    pinionWire.scale.set(1.002, 1.002, 1.002);

    const pinionGroup = new THREE.Group();
    pinionGroup.add(pinionMesh);
    pinionGroup.add(pinionWire);

    // 2. MAIN DRIVEN GEAR - Solid Gunmetal Steel & Titanium
    const gearRadius = 4.0;
    const gearTeeth = 24; // Exact 2:1 gear ratio
    const gearGeom = createGearGeometry({
      teeth: gearTeeth,
      radius: gearRadius,
      depth: 0.6,
      toothHeight: 0.5,
      boreRadius: 0.85,
    });

    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0x0a101d,
      emissiveIntensity: 0.2,
    });

    const steelWireMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const gearMesh = new THREE.Mesh(gearGeom, steelMaterial);
    const gearWire = new THREE.Mesh(gearGeom, steelWireMaterial);
    gearWire.scale.set(1.002, 1.002, 1.002);

    const drivenGearGroup = new THREE.Group();
    drivenGearGroup.add(gearMesh);
    drivenGearGroup.add(gearWire);

    // Position gears so teeth mesh at pitch line
    const centerDistance = pinionRadius + gearRadius; // 6.0 units
    pinionGroup.position.set(-centerDistance * 0.45, 0.4, 0);
    drivenGearGroup.position.set(centerDistance * 0.55, -0.4, 0);

    // Phase adjustment so teeth interlock cleanly
    pinionGroup.rotation.z = Math.PI / pinionTeeth;

    masterAssembly.add(pinionGroup);
    masterAssembly.add(drivenGearGroup);

    // 3. SHAFTS & BEARING RACES
    const shaftGeom = new THREE.CylinderGeometry(0.48, 0.48, 2.8, 32);
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.3 });
    const pinionShaft = new THREE.Mesh(shaftGeom, shaftMat);
    pinionShaft.rotation.x = Math.PI / 2;
    pinionGroup.add(pinionShaft);

    const gearShaftGeom = new THREE.CylinderGeometry(0.82, 0.82, 3.2, 32);
    const gearShaft = new THREE.Mesh(gearShaftGeom, shaftMat);
    gearShaft.rotation.x = Math.PI / 2;
    drivenGearGroup.add(gearShaft);

    // 4. CYAN PITCH CIRCLE GUIDES (Visualizing CAD pitch diameter)
    const pitchCircleGeom1 = new THREE.RingGeometry(pinionRadius - 0.02, pinionRadius + 0.02, 64);
    const pitchCircleMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const pitchCircle1 = new THREE.Mesh(pitchCircleGeom1, pitchCircleMat);
    pitchCircle1.position.z = 0.35;
    pinionGroup.add(pitchCircle1);

    const pitchCircleGeom2 = new THREE.RingGeometry(gearRadius - 0.02, gearRadius + 0.02, 96);
    const pitchCircle2 = new THREE.Mesh(pitchCircleGeom2, pitchCircleMat);
    pitchCircle2.position.z = 0.35;
    drivenGearGroup.add(pitchCircle2);

    // 5. FLOATING CAD PARTICLES / TECHNICAL DUST
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 22;
      particlePositions[i + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xff9f1c,
      transparent: true,
      opacity: 0.45,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const amberLight = new THREE.PointLight(0xff9f1c, 4.5, 30);
    amberLight.position.set(-4, 3, 6);
    scene.add(amberLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 3.5, 30);
    cyanLight.position.set(5, -3, 6);
    scene.add(cyanLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 10, -5);
    scene.add(rimLight);

    // INTERACTION & ANIMATION STATE
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // ANIMATION LOOP
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Base rotation speed + scroll-induced spin
      const scrollFactor = Math.abs(targetScrollY - scrollY) * 0.005;
      const baseSpeed = 0.5 + scrollFactor;

      // KINEMATIC GEAR RATIO (True 2:1 counter-rotation)
      pinionGroup.rotation.z += baseSpeed * delta * 2.0;
      drivenGearGroup.rotation.z -= baseSpeed * delta * 1.0;

      // Exploded assembly translation on scroll
      const explodeAmount = Math.min(Math.max((scrollY - 150) / 600, 0), 1.8);
      pinionMesh.position.z = explodeAmount * 0.9;
      gearMesh.position.z = -explodeAmount * 0.9;
      pinionWire.position.z = explodeAmount * 1.3;
      gearWire.position.z = -explodeAmount * 1.3;

      // Dynamic tilt & scroll orientation
      masterAssembly.rotation.x = 0.35 + targetY * 0.25 + scrollY * 0.0006;
      masterAssembly.rotation.y = -0.3 + targetX * 0.35 + scrollY * 0.0004;
      masterAssembly.position.y = -scrollY * 0.0025;

      // Subtle particle float
      particleSystem.rotation.y += delta * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pinionGeom.dispose();
      gearGeom.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="3d-gear-canvas"
      aria-label="3D Interactive Mechanical Gear Assembly"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
