import { Header } from "./components/Header";
import { HowItWorks } from "./components/HowItWorks";
import Hero from "./components/Hero";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ReactLenis from "lenis/react";
import { UIPreview } from "./components/UIPreview";

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
      <Header />
      <Hero isMobile={isMobile} logoPaths={logoPaths} />
      <HowItWorks isMobile={isMobile} logos={logoPaths} />
      <UIPreview isMobile={isMobile} />
    </>
  );
}
