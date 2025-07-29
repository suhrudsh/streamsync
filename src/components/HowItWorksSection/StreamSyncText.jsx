import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Center, Text3D } from "@react-three/drei";

export function StreamSyncText() {
  const textRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion); // billboard
    }
  });

  return (
    <Center ref={textRef}>
      <Text3D
        font="ClashDisplay-Bold.json"
        position={[0, 0, 0]}
        size={0.5}
        height={0.1} // depth of extrusion
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.01}
        bevelSegments={5}
      >
        StreamSync
        <meshStandardMaterial color="#ad46ff" metalness={0.2} />
      </Text3D>
    </Center>
  );
}
