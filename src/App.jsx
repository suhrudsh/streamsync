import { Canvas, useThree } from "@react-three/fiber";
import { LogoTile } from "./LogoTile";
import { useRef } from "react"; // Removed useEffect as useGSAP handles it
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"; // Import useGSAP

gsap.registerPlugin(ScrollTrigger);

function DevSpotLightHelpers({ keyLightRef, fillLightRef }) {
  // These hooks are always called unconditionally within this component
  useHelper(keyLightRef, SpotLightHelper, 2);
  useHelper(fillLightRef, SpotLightHelper, 2);
  return null; // This component doesn't render any visible JSX elements itself
}
// ------------------------------------------

function Lights() {
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

      {/* Conditionally RENDER the DevSpotLightHelpers component */}
      {import.meta.env.DEV && (
        <DevSpotLightHelpers
          keyLightRef={keyLightRef}
          fillLightRef={fillLightRef}
        />
      )}
    </>
  );
}

function CameraScrollHandler({ scrollTriggerAreaRef, cameraEndPosition }) {
  const { camera } = useThree();

  // useGSAP replaces useEffect for GSAP-related animations
  useGSAP(() => {
    // Set initial camera position once
    camera.position.set(-8, 10, -15);
    // camera.rotation.set(...) if you had a specific initial rotation

    gsap.to(camera.position, {
      y: cameraEndPosition,
      ease: "none",
      scrollTrigger: {
        trigger: scrollTriggerAreaRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        // markers: import.meta.env.DEV,
      },
    });
  }, [camera, cameraEndPosition]); // Dependencies: re-run if camera or end position changes

  return null;
}

function TilesGroupWithAnimation({ scrollTriggerAreaRef, logoPaths }) {
  const tilesGroupRef = useRef();

  useGSAP(() => {
    if (!tilesGroupRef.current || !scrollTriggerAreaRef.current) return;

    gsap.to(tilesGroupRef.current.rotation, {
      y: Math.PI * 2,
      ease: "none",
      scrollTrigger: {
        trigger: scrollTriggerAreaRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        markers: import.meta.env.DEV,
      },
    });
  }, [scrollTriggerAreaRef]);

  return (
    <group ref={tilesGroupRef}>
      {logoPaths.map((logo, index) => (
        <LogoTile
          key={index}
          logo={logo}
          position={[0, index * -1.25, 0]}
          rotation={[0, index * -0.1, 0]}
          animationDirection={index % 4}
        />
      ))}
    </group>
  );
}

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
        className="flex h-[200svh] w-full flex-col justify-center"
      >
        <h1 className="sticky top-0 flex flex-col text-center text-9xl font-black">
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
