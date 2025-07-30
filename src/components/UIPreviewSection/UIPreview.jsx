import { useGSAP } from "@gsap/react";
import { UIPreviewText } from "./UIPreviewText";
import { useRef } from "react";
import gsap from "gsap";

export function UIPreview() {
  const wrapperRef = useRef();
  const imgRefs = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(imgRefs.current[1], {
      autoAlpha: 1,
    }).to(imgRefs.current[2], {
      autoAlpha: 1,
    });
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative grid h-[300svh] gap-8 px-24 xl:grid-cols-5"
    >
      <div className="snap col-span-2 snap-y snap-mandatory">
        <UIPreviewText heading={"All your platforms.\nOne powerful hub."}>
          Jump right into trending content — no switching apps.
        </UIPreviewText>
        <UIPreviewText heading={"Your personalized watchlist — everywhere."}>
          See everything you’ve saved across Netflix, Prime & more.
        </UIPreviewText>
        <UIPreviewText heading={"Find it once.\nPlay it anywhere."}>
          Search across all your subscriptions with one click.
        </UIPreviewText>
      </div>
      <div className="sticky top-0 col-span-3 flex h-svh w-full items-center justify-end">
        <img
          ref={(el) => imgRefs.current.push(el)}
          src="uiPreview/ui-preview-homepage.webp"
          alt=""
          className="absolute rounded-3xl shadow-xl shadow-purple-500/30"
        />
        <img
          ref={(el) => imgRefs.current.push(el)}
          src="uiPreview/ui-preview-watchlist.webp"
          alt=""
          className="absolute rounded-3xl opacity-0 shadow-xl shadow-purple-500/30"
        />
        <img
          ref={(el) => imgRefs.current.push(el)}
          src="uiPreview/ui-preview-search.webp"
          alt=""
          className="absolute rounded-3xl opacity-0 shadow-xl shadow-purple-500/30"
        />
      </div>
    </section>
  );
}
