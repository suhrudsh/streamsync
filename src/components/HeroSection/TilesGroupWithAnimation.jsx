import { useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LogoStackTile from "./LogoStackTile";
import { TouchTracker } from "../../tiles/TouchTracker";
import { HoverRaycastManager } from "../../tiles/HoverRaycastManager";

gsap.registerPlugin(ScrollTrigger);

export function TilesGroupWithAnimation({
  scrollTriggerAreaRef,
  nodes,
  textures,
  logoPaths,
}) {
  const tilesGroupRef = useRef();
  const pointerRef = useRef(new THREE.Vector2(-10, -10));
  const movedRef = useRef(false);
  const tileRefs = useRef([]);

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
      <TouchTracker pointerRef={pointerRef} movedRef={movedRef} />
      <HoverRaycastManager
        pointerRef={pointerRef}
        movedRef={movedRef}
        tileRefs={tileRefs}
      />

      {logoPaths.map((logo, index) => (
        <LogoStackTile
          key={index}
          ref={(el) => (tileRefs.current[index] = el)}
          logo={logo}
          geometry1={nodes.tile_1.geometry}
          geometry2={nodes.tile_2.geometry}
          texture={textures[logo]}
          position={[0, index * -1.25, 0]}
          rotation={[0, index * -0.1, 0]}
          animationDirection={index % 4}
        />
      ))}
    </group>
  );
}
