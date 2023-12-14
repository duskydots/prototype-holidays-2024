import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";
import { isTouch } from "@/utils/device";
import { getMouseOrTouchPosition } from "@/utils/mouse";
import { Vector3 } from "three";
import {
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useGameStore } from "@/store/game";

interface Props {
  children?: React.ReactNode;
}

export const Controls = ({ children }: Props) => {
  const { game } = useGameStore();

  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const cameraInitialPositionRef = useRef<THREE.Vector3>();

  const mouseRef = useRef<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const initialPosition = {
      x: window.innerWidth / 7,
      y: window.innerHeight,
    };

    if (!mouseRef.current) {
      mouseRef.current = initialPosition;
    }

    const setCurrentMousePosition = (x: number, y: number) => {
      gsap.to(mouseRef.current, {
        x: x,
        y: y,
        duration: 1,
        overwrite: true,
      });
    };

    const onMouseMove = (event: MouseEvent | TouchEvent) => {
      const position = getMouseOrTouchPosition(event);
      setCurrentMousePosition(position.x, position.y);
    };

    const onMouseUp = (event: MouseEvent | TouchEvent) => {
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", onMouseUp);
    };

    const onMouseDown = (event: MouseEvent | TouchEvent) => {
      document.addEventListener("touchmove", onMouseMove);
      document.addEventListener("touchend", onMouseUp);
    };

    if (game === `playing`) {
      setCurrentMousePosition(window.innerWidth / 2, window.innerHeight);
      if (isTouch()) {
        document.addEventListener("touchstart", onMouseDown);
      } else {
        document.addEventListener("mousemove", onMouseMove);
      }
    } else {
      setCurrentMousePosition(initialPosition.x, initialPosition.y);
    }

    return () => {
      document.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, [game]);

  useFrame((state) => {
    if (!mouseRef.current) return;

    const x = mouseRef.current.x / window.innerWidth;
    const y = mouseRef.current.y / window.innerHeight;

    if (!cameraInitialPositionRef.current) {
      cameraInitialPositionRef.current = state.camera.position.clone();
    }

    const currentCameraPosition = new Vector3(
      (0.5 - x) * 4,
      (0.5 - y) * 2.5,
      Math.abs((0.5 - x) * 7.0)
    );
    currentCameraPosition.add(cameraInitialPositionRef.current);

    state.camera.position.set(
      currentCameraPosition.x,
      currentCameraPosition.y,
      currentCameraPosition.z
    );

    rigidBodyRef.current?.setNextKinematicTranslation({
      x: currentCameraPosition.x * -1,
      y: 0,
      z: 0,
    });

    state.camera.lookAt(0, 0.25, -2.5);
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      type="kinematicPosition"
      name="santa"
    >
      <CylinderCollider
        args={[0.5, 0.2]}
        mass={0}
        friction={1}
        position={[0, 0.5, -3]}
        name="santa"
      />
      <group position={[0, 0, -3]} rotation={[0, 0, 0]}>
        {children}
      </group>
    </RigidBody>
  );
};
