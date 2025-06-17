import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LogoStackTile from "./LogoStackTile";

gsap.registerPlugin(ScrollTrigger);

export function TilesGroupWithAnimation({ scrollTriggerAreaRef, logoPaths }) {
  const tilesGroupRef = useRef();

  useGSAP(() => {
    if (!tilesGroupRef.current || !scrollTriggerAreaRef.current) return;
    gsap.to(tilesGroupRef.current.rotation, {
      y: Math.PI * 2,
      ease: "none",
      scrollTrigger: {
        trigger: scrollTriggerAreaRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, [scrollTriggerAreaRef]);

  return (
    <group ref={tilesGroupRef}>
      {logoPaths.map((logo, index) => (
        <LogoStackTile
          key={index}
          logo={logo}
          position={[0, index * -1.25, 0]}
          rotation={[0, index * -0.1, 0]}
          animationDirection={index % 4}
        />
      ))}
    </group>
  );
}
