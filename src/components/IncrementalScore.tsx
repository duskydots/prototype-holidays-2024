import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGameStore } from "@/store/game";

export const IncrementalScore = () => {
  const { score } = useGameStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !numberRef.current) return;

    const container = containerRef.current;
    const number = numberRef.current;

    const timeline = gsap.timeline({});

    if (score > 0) {
      timeline
        .fromTo(
          container,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.3,
            ease: "power3.out",
          },
          0
        )
        .fromTo(
          number,
          {
            scale: 2,
            opacity: 0,
            transformOrigin: "center center",
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power3.out",
          },
          0.2
        )
        .to(
          number,
          {
            scale: 1,
            opacity: 0,
            duration: 0.3,
            ease: "power3.in",
          },
          0.5
        );
    }

    return () => {
      timeline.kill();
    };
  }, [score]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-y-0 top-0 left-full flex items-center justify-center opacity-0"
    >
      <div className="relative w-full pl-8">
        <div
          ref={numberRef}
          className="relative text-xl font-semibold whitespace-nowrap flex items-center justify-center"
        >
          <span className="text-xs font-light">+</span>1
        </div>
      </div>
    </div>
  );
};
