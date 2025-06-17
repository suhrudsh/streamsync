import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";

function DevSpotLightHelpers({ keyLightRef, fillLightRef }) {
  useHelper(keyLightRef, SpotLightHelper, 2);
  useHelper(fillLightRef, SpotLightHelper, 2);
  return null;
}

export function Lights() {
  const keyLightRef = useRef();
  const fillLightRef = useRef();

  return (
    <>
      <spotLight
        ref={keyLightRef}
        position={[10, 8, 10]}
        intensity={500}
        castShadow
      />
      <spotLight
        ref={fillLightRef}
        position={[-10, 8, -10]}
        intensity={300}
        castShadow
      />
      {import.meta.env.DEV && (
        <DevSpotLightHelpers
          keyLightRef={keyLightRef}
          fillLightRef={fillLightRef}
        />
      )}
    </>
  );
}
