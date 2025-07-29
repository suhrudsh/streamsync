import { LogoTileBeacon } from "./LogoTileBeacon";
import { useTiles } from "../../tiles/useTiles";
import LogoTile from "../../tiles/LogoTile";
import * as THREE from "three";
import { useTiles } from "../../tiles/useTile";

export default function LogoSphere({ logoPaths }) {
  const { nodes, textures } = useTiles();

  const tiles = useMemo(() => {
    const radius = 5;
    return logoPaths.map((logo, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / logoPaths.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const position = [x, y, z];

      const lookAt = new THREE.Vector3(x, y, z).normalize().negate();
      const quat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, -1, 0),
        lookAt,
      );
      const quaternion = quat.toArray(); // [x, y, z, w]

      return { logo, position, quaternion };
    });
  }, [logoPaths]);

  return (
    <Suspense fallback={null}>
      {tiles.map((tile, i) => (
        <LogoTileBeacon
          key={tile.logo + i}
          position={tile.position}
          quaternion={tile.quaternion}
          geometry1={nodes.tile_1.geometry}
          geometry2={nodes.tile_2.geometry}
          texture={textures[tile.logo]}
          i={i}
        />
      ))}
    </Suspense>
  );
}
