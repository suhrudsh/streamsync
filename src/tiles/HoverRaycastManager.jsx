import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const raycaster = new THREE.Raycaster();

export function HoverRaycastManager({ pointerRef, movedRef, tileRefs }) {
  const { camera } = useThree();
  const currentHover = useRef(null);

  useFrame(() => {
    if (!pointerRef?.current) return;
    if (!movedRef.current) return;
    movedRef.current = false;

    raycaster.setFromCamera(pointerRef.current, camera);

    const objects = tileRefs.current.map((t) => t?.object?.()).filter(Boolean);

    const intersects = raycaster.intersectObjects(objects, true);
    const hitObject = intersects[0]?.object || null;

    let hitTile = null;
    if (hitObject) {
      hitTile = tileRefs.current.find((t) => {
        const obj = t?.object?.();
        return obj && (obj === hitObject || isDescendant(obj, hitObject));
      });
    }

    if (hitTile && hitTile !== currentHover.current) {
      currentHover.current = hitTile;
      hitTile.triggerHover?.();
    } else if (!hitTile) {
      currentHover.current = null;
    }
  });

  return null;
}

function isDescendant(parent, child) {
  let node = child;
  while (node) {
    if (node === parent) return true;
    node = node.parent;
  }
  return false;
}
