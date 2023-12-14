import { Cloud, Clouds, Stars, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BackSide, MeshStandardMaterial } from "three";

export const Background = () => {
  const texture = useTexture("/assets/moutains.jpg");

  const backgroundRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!backgroundRef.current) return;
    backgroundRef.current.rotation.y -= delta * 0.05;
  });

  return (
    <>
      <color attach="background" args={["#17127B"]} />
      <mesh ref={backgroundRef}>
        <sphereGeometry args={[10000, 32, 32]} />
        <meshBasicMaterial
          color={"#17127B"}
          toneMapped={false}
          side={BackSide}
          map={texture}
        />
      </mesh>
      <Stars
        radius={100}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <Clouds material={MeshStandardMaterial}>
        <Cloud
          seed={1}
          scale={1}
          volume={2}
          color="white"
          fade={100}
          speed={0.1}
          position={[0, 4, -2.5]}
        />
        <Cloud
          seed={1}
          scale={1}
          volume={2}
          color="white"
          fade={100}
          speed={0.1}
          position={[0, 4, -7]}
        />
        <Cloud
          seed={1}
          scale={1}
          volume={2}
          color="white"
          fade={100}
          speed={0.1}
          position={[0, 4, -10]}
        />
      </Clouds>
    </>
  );
};
