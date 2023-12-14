import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const Lights = () => {
  const lightsContainerRef = useRef<THREE.Group>(null);

  const lightsRadius = -0.06;

  useFrame(({ clock, camera }) => {
    if (!lightsContainerRef.current) return;
    lightsContainerRef.current.rotation.y = clock.getElapsedTime() * 1;
    lightsContainerRef.current.position.x = camera.position.x * -1;
  });

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[-2, 2, 0]} intensity={0} />
      <pointLight position={[-0.6, 1.1, -2.57]} intensity={3} castShadow />
      <group ref={lightsContainerRef} position-z={-3.2}>
        <pointLight
          position={[0, 0.12, lightsRadius]}
          intensity={30 / 2}
          color="red"
        />
        <pointLight
          position={[lightsRadius, 0.12, -lightsRadius]}
          intensity={10 / 2}
          color="blue"
        />
        <pointLight
          position={[-lightsRadius, 0.12, -lightsRadius]}
          intensity={120 / 2}
          color="green"
        />
      </group>
    </>
  );
};
