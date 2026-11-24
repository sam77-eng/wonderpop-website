import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroShapesCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 9.5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(4, 5, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7c5cff, 0.7);
    dirLight2.position.set(-4, -3, 3);
    scene.add(dirLight2);

    // Shared Geometries
    const geometries = [
      new THREE.IcosahedronGeometry(1.5, 0),
      new THREE.TorusGeometry(1.2, 0.4, 16, 32),
      new THREE.TorusKnotGeometry(0.9, 0.28, 64, 12),
      new THREE.OctahedronGeometry(1.5, 0),
      new THREE.DodecahedronGeometry(1.3, 0),
      new THREE.BoxGeometry(1.8, 1.8, 1.8),
    ];

    const brandColors = [0x4B2DB8, 0xFF6B4A, 0x2EC4B6, 0xFFD23F, 0xFF9BD0, 0x7C5CFF];

    interface FloatingShape {
      mesh: THREE.Mesh;
      baseY: number;
      phase: number;
      rotSpeedX: number;
      rotSpeedY: number;
      floatSpeed: number;
      amplitude: number;
    }

    const floatingShapes: FloatingShape[] = [];
    const count = isMobile ? 3 : 10;

    for (let i = 0; i < count; i++) {
      const geom = geometries[i % geometries.length];
      const color = brandColors[i % brandColors.length];

      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.25,
        metalness: 0.35,
        flatShading: true,
      });

      const mesh = new THREE.Mesh(geom, mat);

      // Wireframe overlay
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      const wireMesh = new THREE.Mesh(geom, wireMat);
      wireMesh.scale.setScalar(1.035);
      mesh.add(wireMesh);

      let x: number;
      let y: number;
      let z: number;
      let scale: number;

      if (isMobile) {
        // Far corners / edges on mobile, away from central content
        const cornerX = i === 0 ? -1 : (i === 1 ? 1 : (Math.random() > 0.5 ? 1 : -1));
        const cornerY = i === 0 ? 1 : (i === 1 ? -1 : (Math.random() > 0.5 ? 1 : -1));
        x = cornerX * (2.2 + Math.random() * 0.5);
        y = cornerY * (3.5 + Math.random() * 0.7);
        z = (Math.random() - 0.5) * 1.5;
        // Reduced by ~25%
        scale = (0.16 + Math.random() * 0.08) * 0.75;
      } else {
        // Desktop safe zone: strictly in left/right margins outside ~900px central area (|x| >= 4.0)
        const side = i % 2 === 0 ? -1 : 1;
        x = side * (4.1 + Math.random() * 2.4);
        y = (Math.random() - 0.5) * 6.5;
        z = (Math.random() - 0.5) * 2.5;
        // Reduced by ~25%
        scale = (0.24 + Math.random() * 0.16) * 0.75;
      }

      mesh.scale.setScalar(scale);
      mesh.position.set(x, y, z);
      scene.add(mesh);

      floatingShapes.push({
        mesh,
        baseY: y,
        phase: Math.random() * Math.PI * 2,
        rotSpeedX: 0.25 + Math.random() * 0.25,
        rotSpeedY: 0.3 + Math.random() * 0.25,
        floatSpeed: 0.7 + Math.random() * 0.5,
        amplitude: 0.25 + Math.random() * 0.2,
      });
    }

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (isMobile) return;
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let animFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      if (!prefersReducedMotion) {
        scene.rotation.y = currentMouseX * 0.2;
        scene.rotation.x = -currentMouseY * 0.15;

        floatingShapes.forEach((item) => {
          item.mesh.rotation.x += item.rotSpeedX * delta;
          item.mesh.rotation.y += item.rotSpeedY * delta;
          item.mesh.position.y =
            item.baseY + Math.sin(elapsedTime * item.floatSpeed + item.phase) * item.amplitude;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();

      geometries.forEach((g) => g.dispose());
      floatingShapes.forEach((item) => {
        if (Array.isArray(item.mesh.material)) {
          item.mesh.material.forEach((m) => m.dispose());
        } else {
          item.mesh.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
