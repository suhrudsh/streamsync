import { useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import LogoTile from "../../tiles/LogoTile";

export default function LogoStackTile({
  geometry1,
  geometry2,
  texture,
  logo,
  position,
  rotation,
  animationDirection,
}) {
  const tileRef = useRef();

  const directionMap = {
    0: new THREE.Vector3(-10, 0, 0),
    1: new THREE.Vector3(0, 0, -10),
    2: new THREE.Vector3(10, 0, 0),
    3: new THREE.Vector3(0, 0, 10),
  };

  const targetOffset = directionMap[animationDirection] || new THREE.Vector3();

  function handleHover(e) {
    e.stopPropagation();
    if (!tileRef.current) return;

    const newPos = tileRef.current.position.clone().add(targetOffset);

    gsap.to(tileRef.current.position, {
      ...newPos,
      duration: 0.2,
      ease: "power2.out",
    });

    gsap.to(tileRef.current.rotation, {
      y: Math.PI,
      duration: 0.2,
      ease: "power2.out",
    });
  }

  function handleUnhover(e) {
    e.stopPropagation();
    if (!tileRef.current) return;

    gsap.to(tileRef.current.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 0.2,
      delay: 1,
      ease: "power2.out",
    });

    gsap.to(tileRef.current.rotation, {
      y: rotation[1],
      duration: 0.2,
      delay: 1,
      ease: "power2.out",
    });
  }

  return (
    <group onPointerOver={handleHover} onPointerOut={handleUnhover}>
      <LogoTile
        geometry1={geometry1}
        geometry2={geometry2}
        texture={texture}
        logo={logo}
        position={position}
        rotation={rotation}
        innerRef={tileRef}
      />
    </group>
  );
}
