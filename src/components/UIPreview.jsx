import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function UIPreview() {
  const containerRef = useRef(null);
  const [scene, setScene] = useState(0);

  const scenes = [
    {
      title: "All your platforms. One powerful hub.",
      sub: "Jump right into trending content — no switching apps.",
    },
    {
      title: "Your personalized watchlist—everywhere.",
      sub: "See everything you’ve saved across Netflix, Prime & more.",
    },
    {
      title: "Find it once. Play it anywhere.",
      sub: "Search across all your subscriptions with one click.",
    },
  ];

  useGSAP(() => {
    const container = containerRef.current;

    // Scene 0 (nothing playing) → Scene 1 (play vid1)
    ScrollTrigger.create({
      trigger: container,
      start: "33% top",
      onEnter: () => {
        setScene(1);
      },
      onLeaveBack: () => {
        setScene(0);
      },
    });

    // Scene 1 → Scene 2 (mute vid1, play vid2)
    ScrollTrigger.create({
      trigger: container,
      start: "66% top",
      onEnter: () => {
        setScene(2);
      },
      onLeaveBack: () => {
        setScene(1);
      },
    });
  }, []);

  return (
    <section ref={containerRef} className="h-[300svh]">
      {/* sticky text */}
      <div className="sticky top-0 flex h-svh items-center justify-center gap-8">
        <div className="w-1/3">
          {scene === 0 && (
            <>
              <h3 className="font-heading text-3xl font-bold transition-opacity duration-500 ease-in-out lg:text-4xl xl:text-6xl starting:translate-y-8 starting:opacity-0">
                All your platforms. One powerful hub.
              </h3>
              <p className="mt-2 text-lg text-zinc-300 transition delay-200 duration-500 ease-in-out starting:translate-y-8 starting:opacity-0">
                Jump right into trending content — no switching apps.
              </p>
            </>
          )}
          {scene === 1 && (
            <>
              <h3 className="font-heading text-3xl font-bold transition-opacity duration-500 ease-in-out lg:text-4xl xl:text-6xl starting:translate-y-8 starting:opacity-0">
                Your personalized watchlist—everywhere.
              </h3>
              <p className="mt-2 text-lg text-zinc-300 transition delay-200 duration-500 ease-in-out starting:translate-y-8 starting:opacity-0">
                See everything you’ve saved across Netflix, Prime & more.
              </p>
            </>
          )}
          {scene === 2 && (
            <>
              <h3 className="font-heading text-3xl font-bold transition duration-500 ease-in-out lg:text-4xl xl:text-6xl starting:translate-y-8 starting:opacity-0">
                Find it once. Play it anywhere.
              </h3>
              <p className="mt-2 text-lg text-zinc-300 transition delay-200 duration-500 ease-in-out starting:translate-y-8 starting:opacity-0">
                Search across all your subscriptions with one click.
              </p>
            </>
          )}
        </div>
        {/* video stack */}
        <div className="2xl flex w-1/2 items-center justify-center">
          {scene === 0 && (
            <img
              src="ui-preview-homepage.webp"
              className="w-full rounded-3xl object-cover shadow-xl shadow-amber-500/40 transition delay-400 duration-500 ease-in-out starting:translate-y-8 starting:opacity-0"
              alt="UI Preview"
            />
          )}
          {scene === 1 && (
            <img
              src="ui-preview-watchlist.webp"
              className="w-full rounded-3xl object-cover shadow-xl shadow-amber-500/40 transition delay-400 duration-500 ease-in-out starting:translate-y-8 starting:opacity-0"
              alt="UI Preview"
            />
          )}
          {scene === 2 && (
            <img
              src="ui-preview-search.webp"
              className="w-full rounded-3xl object-cover shadow-xl shadow-amber-500/40 transition delay-400 duration-500 ease-in-out starting:translate-y-8 starting:opacity-0"
              alt="UI Preview"
            />
          )}
        </div>
      </div>
    </section>
  );
}
