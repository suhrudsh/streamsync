import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function AnimatedCamera() {
  const { camera, clock } = useThree();
  const initialAngle = useRef(null);
  const startTime = useRef(null);
  const initialY = useRef(0);

  if (startTime.current === null) {
    startTime.current = clock.getElapsedTime();
    initialAngle.current = Math.atan2(camera.position.z, camera.position.x);
    initialY.current = camera.position.y;
  }

  useFrame(() => {
    const t = clock.getElapsedTime() - startTime.current;
    const radius = 16;
    const speed = -0.15;
    const angle = initialAngle.current + t * speed;

    camera.position.set(
      radius * Math.cos(angle),
      initialY.current,
      radius * Math.sin(angle),
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
}
