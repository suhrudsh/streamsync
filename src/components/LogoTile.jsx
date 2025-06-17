import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useState, useEffect, useMemo } from "react";

export default function LogoTile({ logo, position, rotation, innerRef }) {
  const { nodes } = useGLTF(import.meta.env.BASE_URL + "logo-tile.glb");
  const texture = useTexture(import.meta.env.BASE_URL + `logos/${logo}`);
  texture.flipY = false;

  const [avgColor, setAvgColor] = useState(new THREE.Color(1, 1, 1));

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
        if (alpha < 10) continue;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

      if (count === 0) return;
      const avg = new THREE.Color(
        r / count / 255,
        g / count / 255,
        b / count / 255,
      );
      avg.convertSRGBToLinear();
      setAvgColor(avg);
    };

    if (img.complete && img.naturalWidth !== 0) {
      computeTrueAverage();
    } else {
      img.addEventListener("load", computeTrueAverage);
      return () => img.removeEventListener("load", computeTrueAverage);
    }
  }, [texture]);

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

  return (
    <group ref={innerRef} position={position} rotation={rotation} scale={4}>
      <mesh geometry={nodes.tile_1.geometry} material={logoMat} />
      <mesh geometry={nodes.tile_2.geometry} material={baseMat} />
    </group>
  );
}
