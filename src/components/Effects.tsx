import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { KernelSize, Resolution } from "postprocessing";

export const Effects = () => {
  return (
    <EffectComposer>
      <Vignette eskil={false} offset={0.1} darkness={0.8} />
    </EffectComposer>
  );
};
