import { useAnimations, useFBX, useTexture } from "@react-three/drei";
import { useLayoutEffect } from "react";
import { Color, Mesh, MeshStandardMaterial } from "three";

export const Santa = () => {
  const fbx = useFBX("/assets/santa.fbx");
  const { actions } = useAnimations(fbx.animations, fbx);

  // fix fbx scale
  const fbxScale = 0.001;

  // enable shadows across all fbx meshes
  fbx.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  const getMeshByName = (name: string) => {
    return fbx.getObjectByName(name) as THREE.Mesh;
  };

  // attach material to body
  const bodyNode = getMeshByName("corpo");
  const bodyTexture = useTexture("/assets/santa.png");

  const bodyMaterial = new MeshStandardMaterial({
    metalness: 0.5,
    roughness: 0.5,
    envMapIntensity: 0.4,
    map: bodyTexture,
    toneMapped: true,
    emissiveIntensity: 1,
  });

  bodyNode.material = bodyMaterial;

  // attach material to pants and hat
  const pantsNode = getMeshByName("Cube002");
  const hatNode = getMeshByName("Sphere002");

  const clothsMaterial = new MeshStandardMaterial({
    color: new Color("#e50000"),
    metalness: 0.72,
    roughness: 0.15,
    envMapIntensity: 0.6,
    flatShading: true,
  });

  pantsNode.material = hatNode.material = clothsMaterial;

  // attach material to hat band and button
  const hatBandNode = getMeshByName("Sphere001");
  const hatButtonNode = getMeshByName("Sphere003");

  const hatBandMaterial = new MeshStandardMaterial({
    color: new Color("#ffffff"),
    metalness: 0.37,
    roughness: 1.0,
    envMapIntensity: 1,
  });

  hatBandNode.material = hatButtonNode.material = hatBandMaterial;

  // attach material to bear
  const beardNode = getMeshByName("polySurface9");

  const beardMaterial = new MeshStandardMaterial({
    color: new Color("#ffffff"),
    metalness: 0.18,
    roughness: 0.88,
    envMapIntensity: 0.4,
  });
  beardNode.material = beardMaterial;

  useLayoutEffect(() => {
    const animation = actions["mixamo.com"] as THREE.AnimationAction;
    animation.play();
  }, [actions]);

  return (
    <primitive
      object={fbx}
      scale={[fbxScale, fbxScale, fbxScale]}
      visible={true}
    />
  );
};
