import { useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export const Floor = () => {
  const scale = {
    x: 500,
    y: 500,
  };

  const texture = useTexture("/assets/ground.png");
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(3000, 1000);

  useFrame((_, delta) => {
    texture.offset.y -= delta * 15;
  });

  return (
    <RigidBody colliders={false} linearDamping={0.75} angularDamping={0.15}>
      <CuboidCollider args={[100, 0.01, 100]} mass={0} />
      <group rotation-x={-Math.PI / 2}>
        <mesh position-z={0.1}>
          <planeGeometry args={[scale.x, scale.y]} />
          <meshBasicMaterial
            color={"white"}
            map={texture}
            transparent
            opacity={0.1}
            toneMapped={true}
          />
        </mesh>
        <mesh receiveShadow>
          <circleGeometry args={[scale.x / 2, 32]} />
          <meshStandardMaterial
            transparent
            color={"#040d41"}
            toneMapped={true}
          />
        </mesh>
      </group>
    </RigidBody>
  );
};
