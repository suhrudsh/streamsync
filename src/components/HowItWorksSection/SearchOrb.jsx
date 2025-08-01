export function SearchOrb({ ref }) {
  return (
    <mesh ref={ref} position={[0, 0, 0]} scale={[0, 0, 0]}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="#ad46ff" />
    </mesh>
  );
}
