import { useRef, useState, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { FloatingLogoTiles } from "./FloatingLogoTiles";
import { StepCard } from "./StepCard";

export function HowItWorks({ logos, isMobile }) {
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
    { x: 7500, z: 0 },
    { x: 7500, z: -3000 },
    { x: -7500, z: 3000 },
    { x: -7500, z: -3000 },
    { x: -7500, z: 0 },
    { x: 7500, z: 3000 },
    // …and so on
  ];

  return (
    <section ref={secRef} className="relative py-24">
      <div className="flex flex-col items-center justify-center gap-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-heading text-center text-4xl font-extrabold lg:text-6xl xl:text-8xl">
            Watch anything. From anywhere.
          </h2>
          <p className="max-w-[45ch] text-center text-base text-zinc-300 md:text-xl lg:text-2xl xl:text-3xl">
            No more juggling apps, subscriptions, or remotes. We unify your
            streaming experience into one seamless platform.
          </p>
        </div>

        <div className="relative flex w-full justify-center">
          <div className="relative flex flex-col gap-8 text-left lg:w-1/2">
            <StepCard step={1} title="Connect Accounts">
              Securely link your existing subscriptions—Netflix, Prime, Disney+,
              and more.
            </StepCard>

            <StepCard step={2} title="Unified Discovery">
              One search bar. One watchlist. Content from all your services in
              one interface.
            </StepCard>

            <StepCard step={3} title="Stream Instantly">
              No switching apps or logging in again. Hit play and enjoy — right
              from here.
            </StepCard>
          </div>
          {!isMobile && (
            <div className="pointer-events-none absolute inset-0">
              <Canvas camera={{ position: [0, 75, 0], fov: 35 }}>
                <FloatingLogoTiles
                  sectionBounds={bounds}
                  positionsPct={positionsPct}
                  logos={logos}
                  scale={1}
                />
              </Canvas>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
