"use client";

import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Bauble } from "@/components/Bauble";
import { useGameStore } from "@/store/game";
import { useEffect, useRef } from "react";
import { Color, Vector3 } from "three";

const items = [...Array(30)].map((_, i) => {
  const offsetX = 7;
  const x = Math.random() * offsetX - offsetX / 2;
  const y = 0.2;
  const z = 50 + i;

  return {
    position: new Vector3(x, y, z),
    color: new Color(Math.random() * 1, Math.random() * 1, Math.random() * 1),
  };
});

export const Baubles = () => {
  const { game, addScore } = useGameStore();

  const rigidBodiesRef = useRef<RapierRigidBody[]>([]);

  useEffect(() => {
    if (!rigidBodiesRef.current.length) return;
    const rigidBodies = rigidBodiesRef.current;

    if (game === "playing") {
      rigidBodies.map((rigidBody, i) => {
        rigidBody.userData = {
          scored: false,
        };
        setTimeout(() => {
          rigidBody.applyImpulse(new Vector3(0, 0, -0.06), true);
        }, i * 400);
      });
    } else {
      rigidBodies.map((rigidBody, i) => {
        rigidBody.sleep();
        rigidBody.applyImpulse(new Vector3(0, 0, 0), true);
        rigidBody.setTranslation(items[i].position, false);
      });
    }

    return () => {};
  }, [game]);

  return (
    <>
      {items.map((item, i) => {
        const scale = 0.1;
        return (
          <RigidBody
            ref={(el) => {
              if (el) {
                rigidBodiesRef.current[i] = el;
              }
            }}
            key={i}
            friction={1}
            colliders={false}
            position={item.position}
            rotation={[
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
            ]}
          >
            <BallCollider
              args={[scale]}
              onCollisionEnter={({ target, other }) => {
                if (other.rigidBodyObject) {
                  if (other.rigidBodyObject.name === "santa") {
                    if (!target.rigidBody) return;
                    const userData: any = target.rigidBody.userData;
                    if (!userData.scored) {
                      userData.scored = true;
                      addScore();
                    }
                  }
                }
              }}
            />
            <Bauble scale={scale} color={item.color} />
          </RigidBody>
        );
      })}
    </>
  );
};
