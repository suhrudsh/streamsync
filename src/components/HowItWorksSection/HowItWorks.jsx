import { StepCard } from "./StepCard";
import { AnimatedPane } from "./AnimatedPane";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks({ logoPaths }) {
  const wrapperRef = useRef(null);
  const stepOneRef = useRef(null);
  const stepTwoRef = useRef(null);
  const stepThreeRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.from(stepTwoRef.current, {
      y: 1000,
      duration: 1,
      ease: "none",
    }).from(stepThreeRef.current, {
      y: 1000,
      duration: 1,
      ease: "none",
    });
  }, []);

  return (
    <section className="relative mb-24 pl-12 xl:px-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-4xl font-extrabold lg:text-4xl xl:text-6xl">
          Watch anything. From anywhere.
        </h2>
        <p className="max-w-[45ch] text-base text-zinc-300 md:text-xl lg:text-2xl xl:text-3xl">
          No more juggling apps, subscriptions, or remotes.
        </p>
      </div>

      <div ref={wrapperRef} className="min-h-[300svh] w-full">
        <div className="sticky top-0 grid h-svh grid-cols-5 gap-8">
          <div className="col-span-2 flex flex-col justify-center gap-4 text-balance">
            <StepCard
              ref={stepOneRef}
              id="step-1"
              title="Connect Accounts"
              step={1}
            >
              Securely link your existing subscriptions—Netflix, Prime, Disney+,
              and more.
            </StepCard>
            <StepCard
              ref={stepTwoRef}
              id="step-2"
              title="Search Universally"
              step={2}
            >
              One search bar. One watchlist. Content from all your services in
              one interface.
            </StepCard>
            <StepCard
              ref={stepThreeRef}
              id="step-3"
              title="Stream Instantly"
              step={3}
            >
              No switching apps or logging in again. Hit play and enjoy — right
              from here.
            </StepCard>
          </div>
          <div className="col-span-3">
            <AnimatedPane logoPaths={logoPaths} wrapperRef={wrapperRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
