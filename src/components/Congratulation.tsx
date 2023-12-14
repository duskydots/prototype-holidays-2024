import gsap from "gsap";
import { useEffect, useRef } from "react";

const colors = ["#ff0000", "#00ff00", "#0000ff"];

const confettis = [...Array(30)].map((_, i) => {
  const x = Math.random() * 1;
  const y = Math.random() * 1;
  return {
    position: { x: x, y: y },
    color: colors[Math.floor(Math.random() * colors.length)],
  };
});

const Confetti = ({
  index,
  position,
  color,
}: {
  index: number;
  position: { x: number; y: number };
  color: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const direction = Math.random() > 0.5 ? 1 : -1;
    const offset = Math.random() * 100 * direction;

    const timeline = gsap.timeline({
      delay: index * 0.1,
      repeat: -1,
      repeatDelay: 2,
    });

    timeline
      .fromTo(
        container,
        {
          opacity: 0,
          y: 0,
        },
        {
          opacity: 1,
          y: -50,
          duration: 0.6,
          ease: `power1.out`,
        }
      )
      .to(container, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: `power1.in`,
      })
      .fromTo(
        container,
        {
          x: 0,
        },
        {
          duration: 1.6,
          x: offset,
          ease: `power1.inOut`,
        },
        0
      );

    return () => {
      timeline.kill();
    };
  }, [index]);

  return (
    <div
      ref={containerRef}
      className="absolute w-1 h-1 rounded-full"
      style={{
        backgroundColor: color,
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`,
      }}
    ></div>
  );
};

export const Congratulation = () => {
  const borderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!borderRef.current) return;

    const border = borderRef.current;

    gsap.fromTo(
      border,
      {
        opacity: 0.1,
      },
      {
        opacity: 0.3,
        duration: 0.6,
        ease: `power2.inOut`,
        repeat: -1,
        yoyo: true,
      }
    );

    return () => {
      gsap.killTweensOf(border);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <div
        ref={borderRef}
        className="absolute inset-0 border border-white rounded-xl"
      ></div>
      <div className="absolute inset-0">
        {confettis.map((confetti, i) => {
          return <Confetti key={i} {...confetti} index={i} />;
        })}
      </div>
    </div>
  );
};
