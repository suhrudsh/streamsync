import { StepCard } from "./StepCard";
import { AnimatedPane } from "./AnimatedPane";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function HowItWorksMobile({ logoPaths }) {
  const wrapperRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const cardsInnerWrapperRef = useRef(null);
  const stepOneRef = useRef(null);
  const stepTwoRef = useRef(null);
  const stepThreeRef = useRef(null);

  useGSAP(() => {
    gsap.set(cardsWrapperRef.current, {
      height: stepOneRef.current.offsetHeight + 32,
    });

    const totalScroll =
      stepOneRef.current.offsetHeight + stepTwoRef.current.offsetHeight + 48;

    gsap.to(cardsInnerWrapperRef.current, {
      y: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative mb-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-4xl font-extrabold lg:text-4xl xl:text-6xl">
          Watch anything. From anywhere.
        </h2>
        <p className="max-w-[45ch] text-base text-zinc-300 md:text-xl lg:text-2xl xl:text-3xl">
          No more juggling apps, subscriptions, or remotes.
        </p>
      </div>

      <div ref={wrapperRef} className="min-h-[300lvh] w-full">
        <div className="sticky top-8 flex h-lvh flex-col justify-evenly">
          <div className="relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 z-10 h-12 bg-gradient-to-b from-black via-transparent to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 z-10 h-12 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div ref={cardsWrapperRef} className="px-2 pt-6">
              <div
                ref={cardsInnerWrapperRef}
                className="flex flex-col gap-4 text-balance"
              >
                <StepCard
                  ref={stepOneRef}
                  id="step-1"
                  title="Connect Accounts"
                  step={1}
                >
                  Securely link your existing subscriptions—Netflix, Prime,
                  Disney+, and more.
                </StepCard>
                <StepCard
                  ref={stepTwoRef}
                  id="step-2"
                  title="Search Universally"
                  step={2}
                >
                  One search bar. One watchlist. Content from all your services
                  in one interface.
                </StepCard>
                <StepCard
                  ref={stepThreeRef}
                  id="step-3"
                  title="Stream Instantly"
                  step={3}
                >
                  No switching apps or logging in again. Hit play and enjoy —
                  right from here.
                </StepCard>
              </div>
            </div>
          </div>

          <AnimatedPane logoPaths={logoPaths} wrapperRef={wrapperRef} />
        </div>
      </div>
    </section>
  );
}
