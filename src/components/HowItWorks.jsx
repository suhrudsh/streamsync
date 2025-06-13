import { useRef, useState, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { FloatingLogoTiles } from "./FloatingLogoTiles";
import { OrbitControls } from "@react-three/drei";

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
    { x: 7500, z: -3000 },
    { x: 7500, z: 0 },
    { x: 7500, z: 3000 },
    { x: -7500, z: -3000 },
    { x: -7500, z: 0 },
    { x: -7500, z: 3000 },
    // …and so on
  ];

  return (
    <section ref={secRef} className="relative py-24">
      <div className="flex flex-col items-center justify-center gap-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-heading text-center text-4xl font-extrabold lg:text-6xl xl:text-8xl">
            Watch anything. From anywhere.
          </h2>
          <p className="max-w-[45ch] text-center text-base text-gray-300 lg:text-2xl xl:text-3xl">
            No more juggling apps, subscriptions, or remotes. We unify your
            streaming experience into one seamless platform.
          </p>
        </div>

        <div className="relative flex w-full justify-center">
          <div className="xl:w-1/3s relative flex flex-col gap-8 text-left lg:w-1/2">
            <div className="relative flex flex-col gap-2 rounded-3xl bg-zinc-800 px-8 py-12 before:absolute before:inset-0 before:-z-10 before:-m-0.5 before:rounded-3xl before:bg-conic-110 before:from-black before:from-30% before:via-zinc-300 before:to-black before:to-100%">
              <h3 className="font-heading flex grow justify-between text-2xl font-semibold lg:text-4xl xl:text-5xl">
                Connect Accounts <span>1</span>
              </h3>
              <p className="text-lg text-gray-400 lg:w-2/3 xl:text-2xl">
                Securely link your existing subscriptions—Netflix, Prime,
                Disney+, and more.
              </p>
            </div>
            <div className="relative flex flex-col gap-2 rounded-3xl bg-zinc-800 px-8 py-12 before:absolute before:inset-0 before:-z-10 before:-m-0.5 before:rounded-3xl before:bg-conic-110 before:from-black before:from-30% before:via-zinc-300 before:to-black before:to-100%">
              <h3 className="font-heading flex justify-between text-2xl font-semibold lg:text-4xl xl:text-5xl">
                Unified Discovery <span>2</span>
              </h3>
              <p className="text-lg text-gray-400 lg:w-2/3 xl:text-2xl">
                One search bar. One watchlist. Content from all your services in
                one interface.
              </p>
            </div>
            <div className="relative flex flex-col gap-2 rounded-3xl bg-zinc-800 px-8 py-12 before:absolute before:inset-0 before:-z-10 before:-m-0.5 before:rounded-3xl before:bg-conic-110 before:from-black before:from-30% before:via-zinc-300 before:to-black before:to-100%">
              <h3 className="font-heading flex justify-between text-2xl font-semibold lg:text-4xl xl:text-5xl">
                Stream Instantly <span>3</span>
              </h3>
              <p className="text-lg text-gray-400 lg:w-2/3 xl:text-2xl">
                No switching apps or logging in again. Hit play and enjoy —
                right from here.
              </p>
            </div>
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
