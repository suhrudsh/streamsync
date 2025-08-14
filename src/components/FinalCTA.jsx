import { useLayoutEffect, useRef, useState } from "react";
import { CTA } from "./CTA";
import { FloatingLogoTiles } from "./FloatingLogoTiles";
import { Canvas } from "@react-three/fiber";

export function FinalCTA({ logos, isMobile }) {
  const secRef = useRef();
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  useLayoutEffect(() => {
    const update = () => {
      const r = secRef.current.getBoundingClientRect();
      setBounds({ left: r.left, top: r.top, width: r.width, height: r.height });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const positionsPct = [
    { x: 6500, z: -5000, offset: [1.2, -1.8, 0.6] },
    { x: 6500, z: 0, offset: [0.6, 0.8, -0.4] },
    { x: 6500, z: 5000, offset: [-1.1, 0.4, 1.0] },

    { x: -6500, z: -5000, offset: [-1.9, -1.4, -0.7] },
    { x: -6500, z: 0, offset: [0.4, 0.0, 0.1] },
    { x: -6500, z: 5000, offset: [2.0, 1.6, -0.9] },

    // …and so on, keep the x/z values the same, tweak offset as needed
  ];

  return (
    <section
      id="get-started"
      ref={secRef}
      className="relative flex h-lvh flex-col items-center justify-center gap-12 bg-gradient-to-b from-black from-50% to-purple-900 py-24 lg:bg-none"
    >
      <img src="StreamSync-Logo.svg" alt="" className="w-84" />

      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="font-heading text-2xl font-bold text-balance whitespace-pre-line md:text-3xl lg:text-4xl xl:text-7xl">
          Wish to start your <br /> streaming journey?
        </h2>
        <p className="text-lg text-balance text-zinc-300 md:text-xl lg:text-2xl xl:text-3xl">
          Join the waitlist today and we'll <br /> let you know when it's ready.
        </p>
      </div>

      <CTA />

      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black from-50% to-purple-900">
          <Canvas camera={{ position: [0, 75, 0], fov: 35 }}>
            <FloatingLogoTiles
              sectionBounds={bounds}
              positionsPct={positionsPct}
              logos={logos}
              scale={3.5}
            />
          </Canvas>
        </div>
      )}
    </section>
  );
}
