import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { CameraScrollHandler } from "./CameraScrollHandler";
import { CTA } from "./CTA";
import { Lights } from "./Lights";
import { TilesGroupWithAnimation } from "./TilesGroupWithAnimation";

export default function Hero() {
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
    <section className="flex flex-col gap-8">
      <div
        ref={scrollTriggerAreaRef}
        className="flex h-[200svh] w-full flex-col"
      >
        <div className="sticky top-30">
          <h1 className="flex flex-col gap-2 text-center text-3xl font-black uppercase lg:text-7xl xl:text-9xl">
            <span>All your streaming platforms.</span>
            <span>One interface.</span>
          </h1>
        </div>
        <div className="sticky top-0 z-0 h-svh">
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
      <CTA />
    </section>
  );
}
