"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function UIPreview({ isMobile }) {
  const containerRef = useRef(null);
  const stackRef = useRef(null);
  const panelRefs = useRef([]);
  // Use a map or a more structured approach to store elements for consistent order
  const panelElementsOrder = useRef({});

  const setPanelRef = (el, i) => {
    if (el) panelRefs.current[i] = el;
  };

  // Modified setElementRef to store elements based on a defined order
  const setElementRef = (panelIdx, elementName) => (el) => {
    if (!panelElementsOrder.current[panelIdx]) {
      panelElementsOrder.current[panelIdx] = {};
    }
    panelElementsOrder.current[panelIdx][elementName] = el;
  };

  useGSAP(() => {
    const panels = Object.values(panelElementsOrder.current);
    const orderedPanels = panels.map((panelElements) => {
      if (isMobile) {
        // Mobile order: image, heading, paragraph
        return [
          panelElements.image,
          panelElements.heading,
          panelElements.paragraph,
        ].filter(Boolean); // Filter out any undefined elements
      } else {
        // Desktop order: depends on layout (heading, paragraph, image OR image, heading, paragraph)
        // We'll determine this based on the panel structure
        // For panel 0 and 2 (where image can be first or last)
        if (panelElements.imagePosition === "first") {
          return [
            panelElements.image,
            panelElements.heading,
            panelElements.paragraph,
          ].filter(Boolean);
        } else {
          // Default: heading, paragraph, image (for panel 1 and when image is last on 0/2)
          return [
            panelElements.heading,
            panelElements.paragraph,
            panelElements.image,
          ].filter(Boolean);
        }
      }
    });

    orderedPanels.forEach((elements) => {
      gsap.set(elements, { autoAlpha: 0, y: 40 });
    });
    // Set the first panel's elements visible initially based on the correct order
    gsap.set(orderedPanels[0], { autoAlpha: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    orderedPanels.forEach((elements, i) => {
      if (i !== 0) {
        tl.to(elements, {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      if (i < orderedPanels.length - 1) {
        tl.to(elements, {
          autoAlpha: 0,
          y: -40,
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.in",
        });
      }
    });
  }, [isMobile]); // Re-run effect if isMobile changes

  return (
    <section ref={containerRef} className="h-[300svh] w-full bg-black">
      <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden">
        <div ref={stackRef} className="relative h-full w-full">
          {/* Panel 0 - Homepage */}
          <div
            ref={(el) => setPanelRef(el, 0)}
            className="absolute inset-0 flex items-center justify-center md:px-8 lg:px-16"
          >
            <div className="grid w-full items-center gap-8 lg:grid-cols-3">
              {isMobile && (
                <img
                  ref={setElementRef(0, "image")}
                  src="ui-preview-homepage.webp"
                  alt="Homepage Preview"
                  className="rounded-3xl shadow-xl shadow-purple-500/30 lg:col-span-2"
                />
              )}
              <div className="flex flex-col gap-4 text-center lg:col-span-1 lg:text-left">
                <h3
                  ref={setElementRef(0, "heading")}
                  className="font-heading text-3xl font-bold text-white lg:text-3xl xl:text-4xl"
                >
                  All your platforms. One powerful hub.
                </h3>
                <p
                  ref={setElementRef(0, "paragraph")}
                  className="text-xl text-zinc-300 lg:text-xl xl:text-2xl"
                >
                  Jump right into trending content — no switching apps.
                </p>
              </div>
              {!isMobile && (
                <img
                  ref={(el) => {
                    setElementRef(0, "image")(el);
                    // Store image position for desktop
                    panelElementsOrder.current[0].imagePosition = "last";
                  }}
                  src="ui-preview-homepage.webp"
                  alt="Homepage Preview"
                  className="rounded-3xl shadow-xl shadow-purple-500/30 lg:col-span-2"
                />
              )}
            </div>
          </div>

          {/* Panel 1 - Watchlist */}
          <div
            ref={(el) => setPanelRef(el, 1)}
            className="absolute inset-0 flex items-center justify-center lg:px-16"
          >
            <div className="grid w-full items-center gap-8 lg:grid-cols-3">
              <img
                ref={(el) => {
                  setElementRef(1, "image")(el);
                  panelElementsOrder.current[1].imagePosition = "first";
                }}
                src="ui-preview-watchlist.webp"
                alt="Watchlist Preview"
                className="rounded-3xl shadow-xl shadow-purple-500/30 lg:col-span-2"
              />
              <div className="flex flex-col gap-4 text-center lg:col-span-1 lg:text-left">
                <h3
                  ref={setElementRef(1, "heading")}
                  className="font-heading text-3xl font-bold text-white lg:text-3xl xl:text-4xl"
                >
                  Your personalized watchlist—everywhere.
                </h3>
                <p
                  ref={setElementRef(1, "paragraph")}
                  className="text-xl text-zinc-300 lg:text-xl xl:text-2xl"
                >
                  See everything you’ve saved across Netflix, Prime & more.
                </p>
              </div>
            </div>
          </div>

          {/* Panel 2 - Search */}
          <div
            ref={(el) => setPanelRef(el, 2)}
            className="absolute inset-0 flex items-center justify-center lg:px-16"
          >
            <div className="grid w-full items-center gap-8 lg:grid-cols-3">
              {isMobile && (
                <img
                  ref={setElementRef(2, "image")}
                  src="ui-preview-search.webp"
                  alt="Search Preview"
                  className="rounded-3xl shadow-xl shadow-purple-500/30 lg:col-span-2"
                />
              )}
              <div className="flex flex-col gap-4 text-center lg:col-span-1 lg:text-left">
                <h3
                  ref={setElementRef(2, "heading")}
                  className="font-heading text-3xl font-bold text-white lg:text-3xl xl:text-4xl"
                >
                  Find it once. Play it anywhere.
                </h3>
                <p
                  ref={setElementRef(2, "paragraph")}
                  className="text-xl text-zinc-300 lg:text-xl xl:text-2xl"
                >
                  Search across all your subscriptions with one click.
                </p>
              </div>
              {!isMobile && (
                <img
                  ref={(el) => {
                    setElementRef(2, "image")(el);
                    panelElementsOrder.current[2].imagePosition = "last";
                  }}
                  src="ui-preview-search.webp"
                  alt="Search Preview"
                  className="rounded-3xl shadow-xl shadow-purple-500/30 lg:col-span-2"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
