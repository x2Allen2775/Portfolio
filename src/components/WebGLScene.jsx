import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLScene({ progress = 0 }) {
  const mountRef = useRef(null);
  const progressRef = useRef(progress);
  
  useEffect(() => { 
    progressRef.current = progress; 
  }, [progress]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 7;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    
    const group = new THREE.Group();
    scene.add(group);
    
    const amber = new THREE.MeshBasicMaterial({ 
      color: 0xd9953f, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.86 
    });
    
    const steel = new THREE.MeshStandardMaterial({ 
      color: 0x6d7d86, 
      metalness: 0.9, 
      roughness: 0.28, 
      transparent: true, 
      opacity: 0.88 
    });
    
    const wire = new THREE.Mesh(new THREE.TorusKnotGeometry(1.35, 0.3, 180, 18, 2, 3), amber);
    const gear = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.34, 12, 32), steel);
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.5, 2), 
      new THREE.MeshBasicMaterial({ color: 0xf4c66c, wireframe: true, transparent: true, opacity: 0.5 })
    );
    
    group.add(wire, gear, core);
    
    const light = new THREE.PointLight(0xffb24d, 18, 10); 
    light.position.set(2, 2, 4); 
    scene.add(light);
    
    const ambient = new THREE.AmbientLight(0x8ba6b8, 1.7); 
    scene.add(ambient);
    
    const resize = () => { 
      const width = mount.clientWidth || 600; 
      const height = mount.clientHeight || 600; 
      camera.aspect = width / height; 
      camera.updateProjectionMatrix(); 
      renderer.setSize(width, height, false); 
    };
    
    resize(); 
    window.addEventListener("resize", resize);
    
    let frame;
    const animate = () => { 
      const p = progressRef.current; 
      wire.rotation.x += 0.002 + p * 0.003; 
      wire.rotation.y += 0.005; 
      gear.rotation.z -= 0.009; 
      gear.rotation.x = p * 0.7; 
      core.rotation.y -= 0.012; 
      group.rotation.y = p * 1.25; 
      group.rotation.z = Math.sin(p * Math.PI) * 0.16; 
      group.position.y = Math.sin(p * Math.PI) * -0.25; 
      group.scale.setScalar(1 - p * 0.16); 
      renderer.render(scene, camera); 
      frame = requestAnimationFrame(animate); 
    };
    
    animate();
    
    return () => { 
      cancelAnimationFrame(frame); 
      window.removeEventListener("resize", resize); 
      renderer.dispose(); 
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement); 
      }
    };
  }, []);

  return (
    <div 
      className="webgl-scene" 
      ref={mountRef} 
      data-testid="webgl-gear-scene" 
      aria-label="Interactive mechanical gear sculpture" 
    />
  );
}
