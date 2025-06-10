import { Canvas } from "@react-three/fiber";
import "./App.css";
import { LogoTile } from "./LogoTile";
import { useRef } from "react";

function App() {
  const directionalLightRef = useRef();

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
    <div className="h-svh w-screen bg-white">
      <Canvas camera={{ position: [-8, 10, -15], fov: 50 }}>
        <axesHelper args={[5]} />
        <ambientLight intensity={1} />
        <directionalLight
          ref={directionalLightRef}
          position={[10, 10, 5]}
          intensity={1}
        />
        {directionalLightRef.current && (
          <directionalLightHelper args={[directionalLightRef.current, 2]} />
        )}

        {logoPaths.map((logo, index) => (
          <LogoTile key={index} logo={logo} position={[0, index * -1.25, 0]} />
        ))}
      </Canvas>
    </div>
  );
}

export default App;
