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
          <FinalCTA isMobile={isMobile} logos={logoPaths} />
          <Footer />
        </TileProvider>
      </div>
    </>
  );
}
