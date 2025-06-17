import { useRef, useState, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { FloatingLogoTiles } from "../FloatingLogoTiles";
import { OrbitControls } from "@react-three/drei";
import { StepCard } from "./StepCard";
import { AnimatedPane } from "./AnimatedPane";

export function HowItWorks({ logos, isMobile }) {
  const [step, setStep] = useState(0);

  return (
    <section className="relative space-y-12 py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-4xl font-extrabold lg:text-6xl xl:text-8xl">
          Watch anything. From anywhere.
        </h2>
        <p className="max-w-[45ch] text-base text-zinc-300 md:text-xl lg:text-2xl xl:text-3xl">
          No more juggling apps, subscriptions, or remotes.
        </p>
      </div>

      <div className="relative grid min-h-[300svh] w-full grid-cols-1 lg:grid-cols-2">
        <div className="flex h-full flex-col justify-evenly px-8">
          <StepCard step={1} title="Connect Accounts">
            Securely link your existing subscriptions—Netflix, Prime, Disney+,
            and more.
          </StepCard>
          <StepCard step={2} title="Unified Discovery">
            One search bar. One watchlist. Content from all your services in one
            interface.
          </StepCard>
          <StepCard step={3} title="Stream Instantly">
            No switching apps or logging in again. Hit play and enjoy — right
            from here.
          </StepCard>
        </div>
        <div className="sticky top-0 h-svh">
          <AnimatedPane activeStep={step} logos={logos} />
        </div>
      </div>
    </section>
  );
}
