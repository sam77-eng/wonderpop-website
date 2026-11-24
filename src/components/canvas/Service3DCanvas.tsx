import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  Environment,
  ContactShadows,
  OrbitControls,
  PerformanceMonitor,
  RoundedBox,
} from '@react-three/drei';
import * as THREE from 'three';
import { SERVICES_DATA } from '../../data/wonderpopData';
import { Move3D } from 'lucide-react';

interface Service3DCanvasProps {
  activeIndex: number;
}

export const Service3DCanvas: React.FC<Service3DCanvasProps> = ({ activeIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [dpr, setDpr] = useState<number>(1.5);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDpr(mobile ? 1.2 : 1.6);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver to pause R3F when off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] flex items-center justify-center select-none"
    >
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        dpr={dpr}
        frameloop={isVisible ? 'always' : 'demand'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <PerformanceMonitor
          onDecline={() => setDpr(isMobile ? 1.0 : 1.2)}
          onIncline={() => setDpr(isMobile ? 1.25 : 1.7)}
        />

        {/* Ambient & Rim Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 5]} intensity={1.3} />
        <directionalLight position={[-4, 2, 3]} color="#FF6B4A" intensity={1.6} />
        <directionalLight position={[3, -3, -4]} color="#7C5CFF" intensity={1.8} />

        {/* Studio Environment Reflections */}
        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>

        {/* Subtle Background Particle Dust */}
        <BackgroundParticles count={isMobile ? 50 : 150} />

        {/* Central Themed 3D Model with Float and OrbitControls */}
        <Suspense fallback={null}>
          <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.7}>
            <ActiveModelSwitcher activeIndex={activeIndex} />
          </Float>

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -2.3, 0]}
            opacity={0.6}
            scale={7}
            blur={2}
            far={3.5}
            color="#14102A"
          />
        </Suspense>

        {/* Orbit Controls (Drag to rotate, limited angles, auto-rotates when idle) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1.0}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.7}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* "Drag to explore" badge with icon */}
      <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center gap-2 pointer-events-none select-none text-white/90 shadow-md">
        <Move3D size={14} className="text-[#FF6B4A] animate-pulse" />
        <span className="text-xs font-semibold tracking-wider uppercase">Drag to explore</span>
      </div>
    </div>
  );
};

// Background Particle Dust
const BackgroundParticles: React.FC<{ count: number }> = ({ count }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 12;
      pos[i + 1] = (Math.random() - 0.5) * 12;
      pos[i + 2] = (Math.random() - 0.5) * 6;
    }
    return [pos];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#FFFFFF" transparent opacity={0.4} />
    </points>
  );
};

// Model Switcher Component with Smooth Scale-In
const ActiveModelSwitcher: React.FC<{ activeIndex: number }> = ({ activeIndex }) => {
  const groupRef = useRef<THREE.Group>(null);
  const service = SERVICES_DATA[activeIndex] || SERVICES_DATA[0];

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Smooth scale spring interpolation towards 1
      groupRef.current.scale.x = THREE.MathUtils.damp(groupRef.current.scale.x, 1, 6, delta);
      groupRef.current.scale.y = THREE.MathUtils.damp(groupRef.current.scale.y, 1, 6, delta);
      groupRef.current.scale.z = THREE.MathUtils.damp(groupRef.current.scale.z, 1, 6, delta);
    }
  });

  // Reset scale slightly on model change to create a pop-in feel
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.set(0.4, 0.4, 0.4);
    }
  }, [activeIndex]);

  const primaryCol = useMemo(() => new THREE.Color(service.color), [service.color]);
  const accentCol = useMemo(() => new THREE.Color(service.accentColor), [service.accentColor]);

  return (
    <group ref={groupRef} scale={[0.4, 0.4, 0.4]}>
      {renderThemedModel(service.modelType, primaryCol, accentCol)}
    </group>
  );
};

// 14 Premium Procedural Themed Models
function renderThemedModel(
  type: string,
  primary: THREE.Color,
  accent: THREE.Color
): React.ReactNode {
  switch (type) {
    // 1. Technology Solutions: Central Processor Core with Floating Gyroscopic Rings
    case 'techSolutions':
      return (
        <group>
          <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.2} smoothness={4}>
            <meshPhysicalMaterial
              color={primary}
              metalness={0.7}
              roughness={0.2}
              clearcoat={0.8}
            />
          </RoundedBox>
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[1.9, 0.08, 16, 64]} />
            <meshPhysicalMaterial color={accent} metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
            <torusGeometry args={[2.3, 0.06, 16, 64]} />
            <meshPhysicalMaterial color="#FFFFFF" metalness={0.95} roughness={0.05} />
          </mesh>
        </group>
      );

    // 2. Web Design: Floating Browser Window with Toolbar, Window Dots & Layered UI Cards
    case 'webDesign':
      return (
        <group>
          {/* Main Browser Window */}
          <RoundedBox args={[2.8, 2.0, 0.2]} radius={0.12} smoothness={4}>
            <meshPhysicalMaterial
              color="#14102A"
              metalness={0.3}
              roughness={0.2}
              clearcoat={0.6}
            />
          </RoundedBox>
          {/* Browser Toolbar Bar */}
          <RoundedBox args={[2.6, 0.35, 0.08]} radius={0.04} smoothness={2} position={[0, 0.7, 0.11]}>
            <meshPhysicalMaterial color="#221A5C" metalness={0.5} roughness={0.2} />
          </RoundedBox>
          {/* Colored Dots (Red, Yellow, Green) */}
          <mesh position={[-1.05, 0.7, 0.16]}>
            <circleGeometry args={[0.06, 16]} />
            <meshBasicMaterial color="#FF5F56" />
          </mesh>
          <mesh position={[-0.88, 0.7, 0.16]}>
            <circleGeometry args={[0.06, 16]} />
            <meshBasicMaterial color="#FFBD2E" />
          </mesh>
          <mesh position={[-0.71, 0.7, 0.16]}>
            <circleGeometry args={[0.06, 16]} />
            <meshBasicMaterial color="#27C93F" />
          </mesh>
          {/* Floating UI Hero Card */}
          <RoundedBox args={[1.7, 0.9, 0.12]} radius={0.08} smoothness={3} position={[0.25, -0.1, 0.2]}>
            <meshPhysicalMaterial
              color={primary}
              metalness={0.6}
              roughness={0.2}
              clearcoat={1}
            />
          </RoundedBox>
          {/* Accent Mini Card */}
          <RoundedBox args={[0.65, 0.55, 0.1]} radius={0.06} smoothness={2} position={[-0.8, -0.25, 0.22]}>
            <meshPhysicalMaterial color={accent} metalness={0.7} roughness={0.15} />
          </RoundedBox>
        </group>
      );

    // 3. Web Development: Stacked Code Cube with Logic Slabs & Neon Connectors
    case 'webDev':
      return (
        <group>
          <RoundedBox args={[1.6, 1.6, 1.6]} radius={0.18} smoothness={4}>
            <meshPhysicalMaterial
              color={primary}
              metalness={0.8}
              roughness={0.15}
              clearcoat={0.9}
            />
          </RoundedBox>
          {/* Cross Logic Slabs */}
          <RoundedBox args={[2.2, 0.25, 2.2]} radius={0.05} smoothness={2} position={[0, 0.2, 0]}>
            <meshPhysicalMaterial color={accent} metalness={0.6} roughness={0.25} />
          </RoundedBox>
          <RoundedBox args={[0.25, 2.2, 2.2]} radius={0.05} smoothness={2} position={[0, 0, 0]}>
            <meshPhysicalMaterial color="#FFFFFF" metalness={0.9} roughness={0.1} />
          </RoundedBox>
        </group>
      );

    // 4. App Development: 3D Smartphone with Glass Screen & App Grid
    case 'appDev':
      return (
        <group>
          {/* Phone Body */}
          <RoundedBox args={[1.6, 2.9, 0.18]} radius={0.16} smoothness={4}>
            <meshPhysicalMaterial
              color="#221A5C"
              metalness={0.8}
              roughness={0.2}
              clearcoat={0.8}
            />
          </RoundedBox>
          {/* Glass Screen */}
          <RoundedBox args={[1.42, 2.65, 0.05]} radius={0.12} smoothness={3} position={[0, 0, 0.08]}>
            <meshPhysicalMaterial
              color={primary}
              metalness={0.3}
              roughness={0.1}
              transmission={0.4}
              clearcoat={1}
            />
          </RoundedBox>
          {/* App Icons Grid */}
          {[-0.38, 0.38].map((x, xi) =>
            [-0.6, 0.05, 0.7].map((y, yi) => (
              <RoundedBox
                key={`${xi}-${yi}`}
                args={[0.38, 0.38, 0.06]}
                radius={0.08}
                smoothness={2}
                position={[x, y, 0.13]}
              >
                <meshPhysicalMaterial
                  color={yi === 0 ? accent : yi === 1 ? '#FFD23F' : '#FF9BD0'}
                  metalness={0.7}
                  roughness={0.15}
                />
              </RoundedBox>
            ))
          )}
        </group>
      );

    // 5. Full-Stack Development: 3-Tier Distributed Database Disks with Activity Beacons
    case 'fullStack':
      return (
        <group>
          {[-0.85, 0, 0.85].map((y, idx) => (
            <group key={idx} position={[0, y, 0]}>
              <Cylinder args={[1.35, 1.35, 0.45, 32]}>
                <meshPhysicalMaterial
                  color={idx === 1 ? accent : primary}
                  metalness={0.75}
                  roughness={0.2}
                  clearcoat={0.6}
                />
              </Cylinder>
              {/* Server Activity Beacon Dot */}
              <mesh position={[1.38, 0, 0]}>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshBasicMaterial color="#2EC4B6" />
              </mesh>
            </group>
          ))}
        </group>
      );

    // 6. UI/UX Design: Interactive Token Sphere with Wireframe Caliper Rings
    case 'uiux':
      return (
        <group>
          <mesh>
            <sphereGeometry args={[1.25, 32, 32]} />
            <meshPhysicalMaterial
              color={primary}
              metalness={0.4}
              roughness={0.15}
              clearcoat={1}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.75, 0.08, 16, 64]} />
            <meshPhysicalMaterial color={accent} metalness={0.8} roughness={0.15} />
          </mesh>
          <mesh rotation={[0, Math.PI / 3, 0]}>
            <torusGeometry args={[2.05, 0.06, 16, 64]} />
            <meshPhysicalMaterial color="#FFD23F" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      );

    // 7. Graphic Design: Bezier Pen Tool & Color Swatch Ribbon
    case 'graphicDesign':
      return (
        <group rotation={[0, 0, -Math.PI / 4]}>
          {/* Pen Nib Body */}
          <Cylinder args={[0.1, 0.5, 1.8, 16]} position={[0, 0.4, 0]}>
            <meshPhysicalMaterial color={primary} metalness={0.8} roughness={0.15} />
          </Cylinder>
          {/* Metal Nib Tip */}
          <Cone args={[0.5, 0.9, 16]} position={[0, -0.8, 0]} rotation={[Math.PI, 0, 0]}>
            <meshPhysicalMaterial color="#FFFFFF" metalness={0.95} roughness={0.05} />
          </Cone>
          {/* Color Swatch Knot Ribbon */}
          <mesh position={[0.2, 0.3, 0]}>
            <torusKnotGeometry args={[0.9, 0.15, 64, 16]} />
            <meshPhysicalMaterial color={accent} metalness={0.6} roughness={0.2} />
          </mesh>
        </group>
      );

    // 8. Social Media Management: Engagement Globe & Orbiting Heart Badges
    case 'socialMedia':
      return (
        <group>
          <mesh>
            <icosahedronGeometry args={[1.25, 2]} />
            <meshPhysicalMaterial
              color={primary}
              metalness={0.5}
              roughness={0.25}
              clearcoat={0.8}
            />
          </mesh>
          {/* Orbiting Badges */}
          {[0, 1, 2].map((i) => {
            const angle = (i * Math.PI * 2) / 3;
            return (
              <group
                key={i}
                position={[Math.cos(angle) * 1.9, Math.sin(angle) * 0.8, Math.sin(angle) * 1.4]}
              >
                <RoundedBox args={[0.45, 0.45, 0.2]} radius={0.1} smoothness={2}>
                  <meshPhysicalMaterial
                    color={i === 0 ? accent : i === 1 ? '#FF9BD0' : '#FFD23F'}
                    metalness={0.7}
                    roughness={0.2}
                  />
                </RoundedBox>
              </group>
            );
          })}
        </group>
      );

    // 9. Meta Ads: Dynamic 3D Megaphone with Growth Soundwaves
    case 'metaAds':
      return (
        <group rotation={[0, 0, -Math.PI / 4]}>
          {/* Megaphone Cone */}
          <Cone args={[1.2, 2.2, 32]} rotation={[Math.PI, 0, 0]}>
            <meshPhysicalMaterial color={primary} metalness={0.6} roughness={0.2} />
          </Cone>
          {/* Megaphone Handle */}
          <Cylinder args={[0.15, 0.15, 0.9, 16]} position={[-0.45, -0.6, 0]} rotation={[0, 0, 0.6]}>
            <meshPhysicalMaterial color="#FFFFFF" metalness={0.8} roughness={0.2} />
          </Cylinder>
          {/* Soundwave Arcs */}
          {[1.5, 2.0].map((r, i) => (
            <mesh key={i} position={[0, 0.9 + i * 0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <torusGeometry args={[r * 0.4, 0.06, 16, 32, Math.PI]} />
              <meshPhysicalMaterial color={accent} metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
        </group>
      );

    // 10. Google Ads: Search Magnifying Glass over Target Bullseye
    case 'googleAds':
      return (
        <group>
          {/* Outer Lens Frame */}
          <mesh>
            <torusGeometry args={[1.3, 0.15, 24, 64]} />
            <meshPhysicalMaterial color={primary} metalness={0.85} roughness={0.15} />
          </mesh>
          {/* Glass Lens (Glass Transmission) */}
          <mesh>
            <circleGeometry args={[1.2, 32]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.85}
              roughness={0.05}
              transparent
              opacity={0.7}
              clearcoat={1}
            />
          </mesh>
          {/* Lens Handle */}
          <Cylinder args={[0.12, 0.12, 1.3, 16]} position={[1.1, -1.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <meshPhysicalMaterial color={accent} metalness={0.7} roughness={0.2} />
          </Cylinder>
          {/* Target Bullseye in background */}
          <mesh position={[0, 0, -0.2]}>
            <torusGeometry args={[0.65, 0.08, 16, 32]} />
            <meshBasicMaterial color="#FF6B4A" />
          </mesh>
        </group>
      );

    // 11. SEO: Magnifying Glass with Rising Bar Chart & Growth Arrow (Teal #2EC4B6)
    case 'seo':
      return (
        <group>
          {/* Magnifying Glass Frame */}
          <mesh position={[-0.2, 0.2, 0]}>
            <torusGeometry args={[1.2, 0.12, 24, 64]} />
            <meshPhysicalMaterial color="#2EC4B6" metalness={0.85} roughness={0.15} />
          </mesh>
          {/* Glass Lens with Transmission */}
          <mesh position={[-0.2, 0.2, 0]}>
            <circleGeometry args={[1.1, 32]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.88}
              roughness={0.05}
              transparent
              opacity={0.65}
              clearcoat={1}
            />
          </mesh>
          {/* Handle */}
          <Cylinder
            args={[0.1, 0.1, 1.2, 16]}
            position={[0.85, -0.85, 0]}
            rotation={[0, 0, -Math.PI / 4]}
          >
            <meshPhysicalMaterial color={accent} metalness={0.75} roughness={0.2} />
          </Cylinder>
          {/* Rising Bar Chart Built from Primitives */}
          <group position={[-0.2, 0.1, 0.08]}>
            {/* Bar 1 */}
            <RoundedBox args={[0.18, 0.45, 0.16]} radius={0.04} smoothness={2} position={[-0.38, -0.35, 0]}>
              <meshPhysicalMaterial color="#2EC4B6" metalness={0.6} roughness={0.2} />
            </RoundedBox>
            {/* Bar 2 */}
            <RoundedBox args={[0.18, 0.75, 0.16]} radius={0.04} smoothness={2} position={[-0.12, -0.2, 0]}>
              <meshPhysicalMaterial color="#FFD23F" metalness={0.6} roughness={0.2} />
            </RoundedBox>
            {/* Bar 3 */}
            <RoundedBox args={[0.18, 1.1, 0.16]} radius={0.04} smoothness={2} position={[0.14, -0.025, 0]}>
              <meshPhysicalMaterial color="#FF6B4A" metalness={0.6} roughness={0.2} />
            </RoundedBox>
            {/* Bar 4 */}
            <RoundedBox args={[0.18, 1.45, 0.16]} radius={0.04} smoothness={2} position={[0.4, 0.15, 0]}>
              <meshPhysicalMaterial color="#7C5CFF" metalness={0.6} roughness={0.2} />
            </RoundedBox>
            {/* Rising Trend Arrow Pointer */}
            <Cone args={[0.16, 0.35, 16]} position={[0.55, 1.05, 0.05]} rotation={[0, 0, -Math.PI / 4]}>
              <meshPhysicalMaterial color="#2EC4B6" metalness={0.9} roughness={0.1} />
            </Cone>
          </group>
        </group>
      );

    // 11. Branding: Faceted Brand Diamond Crystal
    case 'branding':
      return (
        <group>
          <mesh>
            <octahedronGeometry args={[1.65, 0]} />
            <meshPhysicalMaterial
              color={primary}
              metalness={0.9}
              roughness={0.08}
              clearcoat={1}
              reflectivity={1}
            />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
            <torusKnotGeometry args={[1.3, 0.12, 64, 16, 2, 3]} />
            <meshPhysicalMaterial color={accent} metalness={0.85} roughness={0.15} />
          </mesh>
        </group>
      );

    // 12. Video Editing: 3D Film Clapperboard with Dual Rotating Film Reels
    case 'videoEditing':
      return (
        <group>
          {/* Main Slate Body */}
          <RoundedBox args={[2.3, 1.6, 0.18]} radius={0.08} smoothness={3}>
            <meshPhysicalMaterial color="#14102A" metalness={0.4} roughness={0.2} />
          </RoundedBox>
          {/* Clapper Top Arm (Angled) */}
          <RoundedBox args={[2.3, 0.35, 0.2]} radius={0.06} smoothness={2} position={[0.1, 0.88, 0.05]} rotation={[0, 0, 0.2]}>
            <meshPhysicalMaterial color={primary} metalness={0.7} roughness={0.2} />
          </RoundedBox>
          {/* Film Reels */}
          {[-0.65, 0.65].map((rx, idx) => (
            <group key={idx} position={[rx, -0.2, 0.15]}>
              <Cylinder args={[0.45, 0.45, 0.25, 24]} rotation={[Math.PI / 2, 0, 0]}>
                <meshPhysicalMaterial color={accent} metalness={0.85} roughness={0.15} />
              </Cylinder>
            </group>
          ))}
        </group>
      );

    // 13. Photography & Shoots: Studio Camera with Multi-Tier Glass Lens
    case 'photography':
      return (
        <group>
          {/* Camera Body */}
          <RoundedBox args={[2.3, 1.5, 0.95]} radius={0.14} smoothness={4}>
            <meshPhysicalMaterial color={primary} metalness={0.6} roughness={0.25} />
          </RoundedBox>
          {/* Lens Barrel */}
          <Cylinder args={[0.7, 0.7, 0.8, 32]} position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
            <meshPhysicalMaterial color={accent} metalness={0.85} roughness={0.15} />
          </Cylinder>
          {/* Glass Lens Element */}
          <mesh position={[0, 0, 1.12]}>
            <circleGeometry args={[0.62, 32]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.9}
              roughness={0.05}
              clearcoat={1}
            />
          </mesh>
          {/* Top Flash Box */}
          <RoundedBox args={[0.6, 0.35, 0.5]} radius={0.06} smoothness={2} position={[0, 0.92, 0]}>
            <meshPhysicalMaterial color="#FFD23F" metalness={0.7} roughness={0.2} />
          </RoundedBox>
        </group>
      );

    // 14. Content Creation: Magic Creative Wand & Rocket Star
    case 'contentCreation':
    default:
      return (
        <group rotation={[0, 0, Math.PI / 4]}>
          {/* Wand Shaft */}
          <Cylinder args={[0.12, 0.12, 2.5, 16]}>
            <meshPhysicalMaterial color={accent} metalness={0.85} roughness={0.15} />
          </Cylinder>
          {/* Star Rocket Tip */}
          <mesh position={[0, 1.35, 0]}>
            <dodecahedronGeometry args={[0.65, 0]} />
            <meshPhysicalMaterial
              color={primary}
              metalness={0.9}
              roughness={0.1}
              clearcoat={1}
            />
          </mesh>
          {/* Floating Sparkle Rings */}
          <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.06, 16, 32]} />
            <meshPhysicalMaterial color="#FFD23F" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      );
  }
}

// Simple Primitive Component Helpers
const Cylinder: React.FC<any> = ({ args, children, ...props }) => (
  <mesh {...props}>
    <cylinderGeometry args={args} />
    {children}
  </mesh>
);

const Cone: React.FC<any> = ({ args, children, ...props }) => (
  <mesh {...props}>
    <coneGeometry args={args} />
    {children}
  </mesh>
);
