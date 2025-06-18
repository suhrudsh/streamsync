import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import LogoSphere from "./LogoSphere";

export function AnimatedPane({ logoPaths }) {
  return (
    <>
      <Canvas camera={{ position: [0, 10, 20], fov: 50 }}>
        {import.meta.env.DEV && <axesHelper args={[5]} />}
        <ambientLight intensity={1} />
        <LogoSphere logoPaths={logoPaths} />
        <OrbitControls />
      </Canvas>
    </>
  );
}
