import LogoTile from "../../tiles/LogoTile";
import { AnimatedBox } from "./AnimatedBox";
export function LogoTileBeacon({
  position,
  quaternion,
  geometry1,
  geometry2,
  texture,
}) {
  return (
    <group position={position} quaternion={quaternion}>
      <LogoTile
        geometry1={geometry1}
        geometry2={geometry2}
        texture={texture}
        scale={1}
        rotation={[0, Math.PI, 0]}
      />
      <AnimatedBox position={[0, -1, 0]} size={0.5} />
    </group>
  );
}
