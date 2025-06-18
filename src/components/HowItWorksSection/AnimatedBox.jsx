import { useFrame } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";

export function AnimatedBox({ position, size }) {
  const cube = useRef();

  // Random initial rotation offset – stable across renders
  const rotationOffset = useMemo(
    () => ({
      x: Math.random() * Math.PI * 2,
      y: Math.random() * Math.PI * 2,
      z: Math.random() * Math.PI * 2,
    }),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    cube.current.rotation.y = t * 8 + rotationOffset.y;
    cube.current.rotation.x = t * 8 + rotationOffset.x;
    cube.current.rotation.z = t * 8 + rotationOffset.z;
  });

  return (
    <mesh ref={cube} position={position}>
      <boxGeometry args={[1 * size, 1 * size, 1 * size]} />
      <meshPhysicalMaterial
        emissive={"#9810fa"}
        emissiveIntensity={2.5}
        transmission={1}
        roughness={0}
      />
    </mesh>
  );
}
