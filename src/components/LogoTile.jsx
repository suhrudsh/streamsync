import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useState, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

export function LogoTile({ logo, position, rotation, animationDirection }) {
  const tileRef = useRef();

  const { nodes } = useGLTF(import.meta.env.BASE_URL + "logo-tile.glb");
  const texture = useTexture(import.meta.env.BASE_URL + `logos/${logo}`);
  texture.flipY = false;

  // 1) state for averaged color
  const [avgColor, setAvgColor] = useState(new THREE.Color(1, 1, 1));

  // 2) compute only once texture.image is loaded
  useEffect(() => {
    const img = texture.image;
    if (!img) return;

    const computeTrueAverage = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, img.width, img.height);

      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        // optional: skip fully transparent or near-black pixels
        if (alpha < 10) continue;
        const red = data[i],
          green = data[i + 1],
          blue = data[i + 2];

        r += red;
        g += green;
        b += blue;
        count++;
      }

      if (count === 0) return; // fallback

      const avg = new THREE.Color(
        r / count / 255,
        g / count / 255,
        b / count / 255,
      );
      avg.convertSRGBToLinear(); // match PBR expectations
      setAvgColor(avg);
    };

    if (img.complete && img.naturalWidth !== 0) {
      computeTrueAverage();
    } else {
      img.addEventListener("load", computeTrueAverage);
      return () => img.removeEventListener("load", computeTrueAverage);
    }
  }, [texture]);

  // 3) build the two materials
  const [logoMat, baseMat] = useMemo(() => {
    const lm = new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.6,
      metalness: 0.4,
      toneMapped: false,
    });
    const bm = new THREE.MeshPhysicalMaterial({
      color: avgColor,
      roughness: 0.2,
      metalness: 0.6,
      toneMapped: true,
    });
    return [lm, bm];
  }, [texture, avgColor]);

  const directionMap = {
    0: new THREE.Vector3(-10, 0, 0), // left
    1: new THREE.Vector3(0, 0, -10), // back
    2: new THREE.Vector3(10, 0, 0), // right
    3: new THREE.Vector3(0, 0, 10), // front
  };

  const targetOffset = directionMap[animationDirection] || new THREE.Vector3();

  function handleHover(e) {
    e.stopPropagation();
    if (!tileRef.current) return;

    const newPos = tileRef.current.position.clone().add(targetOffset);

    gsap.to(tileRef.current.position, {
      x: newPos.x,
      y: newPos.y,
      z: newPos.z,
      duration: 0.2,
      ease: "power2.out",
    });

    gsap.to(tileRef.current.rotation, {
      y: Math.PI * 1,
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

  // 4) render both sub-meshes
  return (
    <group
      ref={tileRef}
      position={position}
      scale={4}
      rotation={rotation}
      onPointerOver={handleHover}
      onPointerOut={handleUnhover}
    >
      <mesh geometry={nodes.tile_1.geometry} material={logoMat} />
      <mesh geometry={nodes.tile_2.geometry} material={baseMat} />
    </group>
  );
}
