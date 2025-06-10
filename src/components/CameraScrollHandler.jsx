import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function CameraScrollHandler({
  scrollTriggerAreaRef,
  cameraEndPosition,
}) {
  const { camera } = useThree();

  useGSAP(() => {
    camera.position.set(-8, 10, -15);
    gsap.to(camera.position, {
      y: cameraEndPosition,
      ease: "none",
      scrollTrigger: {
        trigger: scrollTriggerAreaRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, [camera, cameraEndPosition]);

  return null;
}
