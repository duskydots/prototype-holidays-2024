import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGameStore } from "@/store/game";
import { IconHeart } from "@/icons/IconHeart";
import { IncrementalScore } from "@/components/IncrementalScore";

export const Score = () => {
  const { score } = useGameStore();

  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!iconRef.current) return;

    const icon = iconRef.current;

    const timeline = gsap.timeline({});

    if (score > 0) {
      timeline.fromTo(
        icon,
        {
          scale: 1.5,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        0
      );
    }

    return () => {
      timeline.kill();
    };
  }, [score]);

  return (
    <div className="relative flex items-center justify-center gap-2">
      <div ref={iconRef} className="relative">
        <IconHeart />
      </div>
      <div>{score}</div>
      <IncrementalScore />
    </div>
  );
};
