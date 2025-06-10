import { Canvas } from "@react-three/fiber";
import "./App.css";
import { LogoTile } from "./LogoTile";
import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";

function Lights() {
  const keyLightRef = useRef();
  const fillLightRef = useRef();

  useHelper(
    keyLightRef,
    SpotLightHelper,
    import.meta.env.NODE_ENV === "development" ? 2 : undefined,
  );
  useHelper(
    fillLightRef,
    SpotLightHelper,
    import.meta.env.NODE_ENV === "development" ? 2 : undefined,
  );

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
    </>
  );
}

export default function App() {
  const logoPaths = [
    "apple-tv-logo.webp",
    "disney-plus-logo.webp",
    "espn-logo.webp",
    "hbo-max-logo.webp",
    "hulu-logo.webp",
    "jiohotstar-logo.webp",
    "netflix-logo.webp",
    "paramount-plus-logo.webp",
    "prime-video-logo.webp",
  ];

  return (
    <div className="h-[200svh] w-screen">
      <div className="sticky top-0 h-svh w-screen">
        <Canvas camera={{ position: [-8, 10, -15], fov: 50 }}>
          <axesHelper args={[5]} />
          <Lights />
          <ambientLight intensity={1} />

          {logoPaths.map((logo, index) => (
            <LogoTile
              key={index}
              logo={logo}
              position={[0, index * -1.25, 0]}
              rotation={[0, index * -0.1, 0]}
              animationDirection={index % 4}
            />
          ))}
        </Canvas>
      </div>
    </div>
  );
}
