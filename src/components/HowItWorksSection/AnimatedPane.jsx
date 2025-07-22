import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import LogoSphere from "./LogoSphere";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export function AnimatedPane({ logoPaths }) {
  return (
    <>
      <Canvas camera={{ position: [0, -5, 12.5], fov: 50 }} shadows>
        {import.meta.env.DEV && <axesHelper args={[5]} />}
        <ambientLight intensity={1} />
        <LogoSphere logoPaths={logoPaths} />
        <OrbitControls />
        <EffectComposer>
          <Bloom
            intensity={1}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.05}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </>
  );
}
