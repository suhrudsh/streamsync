import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Beacon({
  radius = 0.2,
  height = 2.0,
  radialSegments = 32,
  heightSegments = 24,
  cubeSize = 0.05,
}) {
  const instanceRef = useRef();

  // 1) Build the CylinderGeometry once
  const cylinderGeo = useMemo(
    () =>
      new THREE.CylinderGeometry(
        radius,
        radius,
        height,
        radialSegments,
        heightSegments,
        false,
      ),
    [radius, height, radialSegments, heightSegments],
  );

  // 2) Extract only the non-cap vertices + normals
  const verts = useMemo(() => {
    const pos = cylinderGeo.attributes.position.array;
    const nor = cylinderGeo.attributes.normal.array;
    const out = [];
    const half = height / 2;
    const tol = 0.01;

    for (let i = 0; i < pos.length; i += 3) {
      const y = pos[i + 1];
      // skip caps
      if (Math.abs(y - half) < tol || Math.abs(y + half) < tol) continue;
      out.push({
        position: new THREE.Vector3(pos[i], y, pos[i + 2]),
        normal: new THREE.Vector3(nor[i], nor[i + 1], nor[i + 2]),
      });
    }
    return out;
  }, [cylinderGeo, height]);

  // 3) Each frame, compute the same sine-wave displacement and update each cube
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const dummy = new THREE.Object3D();
    verts.forEach(({ position, normal }, i) => {
      // base sine wave
      const wave = Math.sin(position.y * 5 + t * 4);
      const totalDisplacement = wave * 0.1;

      dummy.position.copy(position).addScaledVector(normal, totalDisplacement);

      dummy.updateMatrix();
      instanceRef.current.setMatrixAt(i, dummy.matrix);
    });

    instanceRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={[0, -height / 2 - 0.25, 0]}>
      <instancedMesh
        ref={instanceRef}
        args={[
          new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize),
          new THREE.MeshPhysicalMaterial({
            emissive: "#00ff00",
            emissiveIntensity: 0.2,
          }),
          verts.length,
        ]}
      />
    </group>
  );
}
