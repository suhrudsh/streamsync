import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";
import LogoTile from "../../tiles/LogoTile";
import { Beacon } from "./Beacon";

export function LogoTileBeacon({
  position,
  quaternion,
  geometry1,
  geometry2,
  texture,
}) {
  const lightRef = useRef();
  useHelper(lightRef, SpotLightHelper, "teal");

  return (
    <group position={position} quaternion={quaternion}>
      <spotLight
        ref={lightRef}
        position={[0, 5, 0]}
        distance={6}
        intensity={100}
        angle={0.3}
        castShadow
      />
      <LogoTile
        geometry1={geometry1}
        geometry2={geometry2}
        texture={texture}
        scale={1}
        rotation={[0, Math.PI, 0]}
      />
      <Beacon />
    </group>
  );
}
