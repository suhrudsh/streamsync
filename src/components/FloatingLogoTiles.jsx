import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useCallback, useRef } from "react";
import LogoTile from "../tiles/LogoTile";
import { useTiles } from "../tiles/useTiles";

export function FloatingLogoTiles({
  sectionBounds, // { left, top, width, height } in px
  positionsPct, // [{ x:10, y:20 }, …]
  logos, // ["hbo.webp","netflix.webp",…] same length
  scale = 4, // tile scale
}) {
  const { size, camera } = useThree();

  const { nodes, textures } = useTiles();

  // Convert screen‐pixel → world coords at z=0
  const toWorld = useCallback(
    (px, py) => {
      // normalize to NDC
      const xN = (px / size.width) * 2 - 1;
      const yN = -(py / size.height) * 2 + 1;
      // unproject onto the z=0.5 plane (mid‐frustum)
      const vec = new THREE.Vector3(xN, yN, 0.5).unproject(camera);
      // vec.x is world X, vec.y is world Y, vec.z is world Z
      // we want screen Y → world Z, and keep world Y fixed at 0
      return [vec.x, vec.z];
    },
    [size.width, size.height, camera],
  );

  // Precompute the world positions for each tile
  const instances = useMemo(() => {
    return positionsPct.map((pos, i) => {
      const px = sectionBounds.left + (pos.x / 100) * sectionBounds.width;
      const py = sectionBounds.top + (pos.z / 100) * sectionBounds.height;
      const [wx, wz] = toWorld(px, py);
      return {
        logo: logos[i],
        position: [
          wx + (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 10,
          wz + (Math.random() - 0.5) * 5,
        ],
      };
    });
  }, [positionsPct, logos, sectionBounds, toWorld]);

  const tileRefs = useRef([]);
  tileRefs.current = [];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    tileRefs.current.forEach((ref, i) => {
      if (!ref) return;
      ref.rotation.x = Math.sin(t * 1.5 + i) * 0.1;
      ref.rotation.y = Math.cos(t * 1.2 + i) * 0.1;
    });
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 5, 5]} intensity={5} />
      <directionalLight position={[-5, -2, 3]} intensity={5} />

      {instances.map(({ logo, position }, i) => (
        <group
          key={i}
          ref={(el) => (tileRefs.current[i] = el)}
          position={position}
          rotation={[0, 0, 0]} // face camera
          scale={[scale, scale, scale]}
        >
          <LogoTile
            logo={logo}
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
            geometry1={nodes.tile_1.geometry}
            geometry2={nodes.tile_2.geometry}
            texture={textures[logo]}
            scale={1}
          />
        </group>
      ))}
    </>
  );
}
FloatingLogoTiles.displayName = "FloatingLogoTiles";
