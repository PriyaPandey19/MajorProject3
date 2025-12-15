import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Text, Html } from "@react-three/drei";

import gsap from "gsap";


// Ensure spelling and categories match your App
const CATEGORY_COLORS = {
  "Skills": "#6366f1",
  "Project": "#10b981",
  "Education": "#374151",
  "Hobbies": "#f97316",
  "Certificates":"rgba(102, 95, 18, 0.2)",
   "Experience":"#571604ff",
  default: "#6366f1",
};

function CardMesh({ config,section}) {
  const ref = useRef();

  // Rotate continuously
  useFrame((_, delta) => {
    if (!ref.current) return;
    const rs = config.rotationSpeed ?? 1.0;
    ref.current.rotation.x += (rs * 0.2) * delta;
    ref.current.rotation.y += (rs * 0.5) * delta;
  });

  useEffect(() => {
    if (!ref.current) return;

    // Animate scale
    const targetScale = config.scaleFactor ?? 1;
    gsap.to(ref.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: Math.max(0.4, (config.animationDuration ?? 1.5) * 0.5),
      ease: "power2.out",
    });

    // Animate color
    const hex = config.colorHex ?? CATEGORY_COLORS[config.colorTheme] ?? CATEGORY_COLORS.default;
    if (ref.current.material && ref.current.material.color) {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      gsap.to(ref.current.material.color, { r, g, b, duration: 0.4 });
    }
  }, [config]);

  return (
    <group ref={ref} position={config.position}>
      <mesh castShadow>
      <boxGeometry args={[1.6, 1.0, 0.18]} />
      <meshStandardMaterial
        color={CATEGORY_COLORS[config.colorTheme] ?? CATEGORY_COLORS.default}
        metalness={0.25}
        roughness={0.4}
      />
    </mesh>

     <Text position={[0, 0.6, 0]} fontSize={0.15} color="#fff" anchorX="center" anchorY="middle">
        {section.title}
      </Text>

           <Html position={[0, 0, 0]}>
        <div style={{
          width: 140,
          background: "rgba(255,255,255,0.85)",
          padding: 6,
          borderRadius: 6,
          fontSize: 12,
          textAlign: "center"
        }}>
          {section.content}
        </div>
      </Html>
        </group>

  );
}

export default function AnimationCardPreview({ sections }) {
  const safeSections = Array.isArray(sections) ? sections : [];
  return (
    <div style={{ width: "100%", height: 320, borderRadius: 12, overflow: "hidden" }}>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
       
          {Array.isArray(sections) && sections.length > 0 && sections.map((section, idx) => {
          const cfg = section.configData || {};   // FIX: no crash if undefined

  const config = {
    animationDuration: cfg.animationDuration ?? 2.5,
    colorTheme: cfg.colorTheme ?? section.category ?? "default",
    scaleFactor: cfg.scaleFactor ?? 1,
    rotationSpeed: cfg.rotationSpeed ?? 1,
    colorHex: cfg.colorHex ?? null,
    position:[idx * 2.5 - (sections.length - 1),0,0],
  };


          return (
            <CardMesh
              key={idx}
              config={config}
             section={section}
            />
          );
        })}
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
