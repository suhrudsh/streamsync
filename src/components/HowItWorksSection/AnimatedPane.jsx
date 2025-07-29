import { Canvas } from "@react-three/fiber";
import LogoSphere from "./LogoSphere";
import { AnimatedCamera } from "./AnimatedCamera";
import { useState } from "react";

export function AnimatedPane({ logoPaths, wrapperRef }) {
  const [rotateCamera, setRotateCamera] = useState(false);

  return (
    <div className="mask-radial-fade h-full w-full">
      <Canvas camera={{ position: [16, 10, 5], fov: 50 }} shadows>
        {import.meta.env.DEV && <axesHelper args={[5]} />}
        <ambientLight intensity={4} />
        <pointLight intensity={100} />
        <LogoSphere
          logoPaths={logoPaths}
          wrapperRef={wrapperRef}
          setRotateCamera={setRotateCamera}
        />
        {rotateCamera && <AnimatedCamera />}
      </Canvas>
    </div>
  );
}
