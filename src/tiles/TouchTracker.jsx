import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function TouchTracker({ pointerRef, movedRef }) {
  const { gl } = useThree();

  useEffect(() => {
    const handlePointerMove = (e) => {
      const touch = e.touches ? e.touches[0] : e;
      const { clientX, clientY } = touch;
      const rect = gl.domElement.getBoundingClientRect();

      pointerRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      movedRef.current = true;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, [gl.domElement, pointerRef, movedRef]);

  return null;
}
