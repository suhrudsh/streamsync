import React, { useState, useEffect, useMemo } from "react";
import * as THREE from "three";

export default function LogoTile({
  geometry1,
  geometry2,
  texture,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  ref,
  scale = 4,
}) {
  // ✅ Hooks always called
  const [avgColor, setAvgColor] = useState(new THREE.Color(1, 1, 1));

  useEffect(() => {
    if (!texture || !texture.image) return;
    const img = texture.image;
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
        if (data[i + 3] < 10) continue;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
      if (!count) return;
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
    // Only use texture if it's defined
    const lm = new THREE.MeshPhysicalMaterial({
      map: texture && texture.image ? texture : null,
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
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <mesh geometry={geometry1} material={logoMat} />
      <mesh geometry={geometry2} material={baseMat} />
    </group>
  );
}
