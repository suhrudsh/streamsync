import { Header } from "./components/Header";
import { HowItWorks } from "./components/HowItWorksSection/HowItWorks";
import Hero from "./components/HeroSection/Hero";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ReactLenis from "lenis/react";
import { TileProvider } from "./tiles/TileProvider";
import { UIPreview } from "./components/UIPreviewSection/UIPreview";
import { UIPreviewMobile } from "./components/UIPreviewSection/UIPreviewMobile";
import { HowItWorksMobile } from "./components/HowItWorksSection/HowItWorksMobile";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logoPaths = [
    "apple-tv-logo.webp",
    "disney-plus-logo.webp",
    "espn-logo.webp",
    "hbo-max-logo.webp",
    "hulu-logo.webp",
    "jiohotstar-logo.webp",
    "paramount-plus-logo.webp",
    "prime-video-logo.webp",
    "netflix-logo.webp",
  ];

  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  const finalCTARef = useRef();
  const footerRef = useRef();

  function ScrollColorEffect({ finalCTARef, footerRef }) {
    useEffect(() => {
      if (!finalCTARef.current) return;

      const handleScroll = () => {
        const bottom = finalCTARef.current.getBoundingClientRect().bottom;
        const isPastTrigger = bottom < window.innerHeight;
        const color = isPastTrigger ? "#59168b" : "#000000";
        document.body.style.backgroundColor = color;
        if (footerRef.current) footerRef.current.style.backgroundColor = color;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }, [finalCTARef, footerRef]);

    return null;
  }

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <div className="relative z-10">
        <Header />
        <TileProvider
          glbUrl={import.meta.env.BASE_URL + "logo-tile.glb"}
          logoPaths={logoPaths}
          baseUrl={import.meta.env.BASE_URL}
        >
          <Hero isMobile={isMobile} logoPaths={logoPaths} />
          {isMobile ? (
            <HowItWorksMobile logoPaths={logoPaths} />
          ) : (
            <HowItWorks logoPaths={logoPaths} />
          )}
          {isMobile ? <UIPreviewMobile /> : <UIPreview />}
          <FinalCTA ref={finalCTARef} isMobile={isMobile} logos={logoPaths} />
          <Footer ref={footerRef} />
          <ScrollColorEffect finalCTARef={finalCTARef} footerRef={footerRef} />
        </TileProvider>
      </div>
    </>
  );
}
