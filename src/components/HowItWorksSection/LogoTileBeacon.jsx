import LogoTile from "../../tiles/LogoTile";
import { AnimatedBox } from "./AnimatedBox";
export function LogoTileBeacon({
  position,
  rotation,
  geometry1,
  geometry2,
  texture,
}) {
  return (
    <group position={position} rotation={rotation}>
      <LogoTile
        geometry1={geometry1}
        geometry2={geometry2}
        texture={texture}
        scale={1}
      />
      <AnimatedBox position={[0, -1, 0]} size={0.5} />
    </group>
  );
}
