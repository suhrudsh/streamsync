import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Lights } from "./components/Lights";
import { CameraScrollHandler } from "./components/CameraScrollHandler";
import { TilesGroupWithAnimation } from "./components/TilesGroupWithAnimation";

export default function App() {
  const scrollTriggerAreaRef = useRef();

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

  const numberOfTiles = logoPaths.length;
  const lastTileY = (numberOfTiles - 1) * -1.25;
  const cameraTargetY = lastTileY + 5; // Adjust offset as needed

  return (
    <>
      <div
        ref={scrollTriggerAreaRef}
        className="flex h-[200svh] w-full flex-col"
      >
        <h1 className="sticky top-0 flex flex-col text-center text-9xl font-black uppercase">
          <span>All your services, </span>
          <span>in one place</span>
        </h1>

        <div className="sticky top-0 h-svh w-screen">
          <Canvas camera={{ position: [-8, 10, -15], fov: 50 }}>
            {import.meta.env.DEV && <axesHelper args={[5]} />}
            <Lights />
            <ambientLight intensity={1} />

            <CameraScrollHandler
              scrollTriggerAreaRef={scrollTriggerAreaRef}
              cameraEndPosition={cameraTargetY}
            />

            <TilesGroupWithAnimation
              scrollTriggerAreaRef={scrollTriggerAreaRef}
              logoPaths={logoPaths}
            />
          </Canvas>
        </div>
      </div>
      <div className="h-svh"></div>
    </>
  );
}
