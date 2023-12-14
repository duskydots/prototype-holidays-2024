"use client";

import { Env } from "@/components/Env";
import { Floor } from "@/components/Floor";
import { Lights } from "@/components/Lights";
import { Santa } from "@/components/Santa";
import { Controls } from "@/components/Controls";
import { Canvas } from "@react-three/fiber";
import { Effects } from "@/components/Effects";
import { Background } from "@/components/Background";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Overlay } from "@/components/Overlay";
import { Preloader } from "@/components/Preloader";
import { Baubles } from "@/components/Baubles";

export default function Page() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 2, -4.5], far: 20000, near: 0.001 }}
        dpr={[1, 2]}
        frameloop="always"
        shadows
        linear
      >
        <Suspense>
          <Physics colliders={false} gravity={[0, -1, 0]}>
            <Background />
            <Lights />
            <Env />
            <Effects />
            <Floor />
            <Controls>
              <Santa />
            </Controls>
            <Baubles />
          </Physics>
        </Suspense>
      </Canvas>
      <Overlay />
      <Preloader />
    </div>
  );
}
