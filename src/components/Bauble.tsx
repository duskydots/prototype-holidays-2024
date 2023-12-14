import { useGLTF } from "@react-three/drei";
import { Color } from "three";

interface Props {
  scale: number;
  color: Color;
}

export const Bauble = ({ scale, color }: Props) => {
  const { nodes, materials } = useGLTF("/assets/cap.glb", true);
  const mesh = nodes.Mesh_1 as any;
  return (
    <group>
      <mesh castShadow receiveShadow scale={scale}>
        <sphereGeometry args={[1, 28, 28]} />
        <meshStandardMaterial
          color={color}
          metalness={1}
          roughness={0.1}
          toneMapped={false}
          emissive={new Color(0, 0, 0.1)}
          emissiveIntensity={0.1}
          envMapIntensity={0.5}
        />
      </mesh>
      <mesh
        castShadow
        scale={1 * scale * 1}
        position={[0, 0, 0 * scale * 1]}
        geometry={mesh.geometry}
      >
        <meshStandardMaterial
          {...materials.Golden}
          metalness={0.75}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
};
