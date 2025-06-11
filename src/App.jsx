import { Header } from "./components/Header";
import { HowItWorks } from "./components/HowItWorks";
import Hero from "./components/Hero";
import { useEffect, useState } from "react";

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
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
    "netflix-logo.webp",
    "paramount-plus-logo.webp",
    "prime-video-logo.webp",
  ];

  return (
    <>
      <Header />
      <Hero isMobile={isMobile} logoPaths={logoPaths} />
      <HowItWorks isMobile={isMobile} logos={logoPaths} />
    </>
  );
}
