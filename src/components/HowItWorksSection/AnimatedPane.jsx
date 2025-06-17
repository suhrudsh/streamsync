import { Canvas } from "@react-three/fiber";

export function AnimatedPane({ activeStep, logos }) {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}></Canvas>
    </>
  );
}
