"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DuskyDots } from "@/components/DuskyDots";

interface Props {
  onComplete: () => void;
}

const Loader = ({ onComplete }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 1.5, onComplete: onComplete });

      timeline
        .fromTo(
          "g",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
          }
        )
        .to("g", {
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power3.out",
        })
        .to(container, {
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });
    }, container);

    return () => {
      context.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center py-6 px-10 bg-neutral-950 text-white"
    >
      <div className="max-w-[200px]">
        <DuskyDots className="w-full opacity-0" />
      </div>
    </div>
  );
};

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <Loader
          onComplete={() => {
            setIsLoading(false);
          }}
        />
      )}
    </>
  );
};
