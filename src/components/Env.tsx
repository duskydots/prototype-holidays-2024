import { Environment } from "@react-three/drei";

export const Env = () => {
  return (
    <>
      <Environment files={`/assets/env.hdr`} />
    </>
  );
};
