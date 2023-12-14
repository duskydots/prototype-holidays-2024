import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Congratulation } from "@/components/Congratulation";

interface Props {
  children?: React.ReactNode;
  currentItem: number;
  maxItems: number;
}

export const Wish = ({ children, currentItem, maxItems }: Props) => {
  const textRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !paginationRef.current) return;

    const text = textRef.current;
    const pagination = paginationRef.current;

    const timelime = gsap.timeline({});

    timelime
      .fromTo(
        text,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: `power2.out`,
        }
      )
      .fromTo(
        pagination,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: `power2.out`,
        },
        `-=${0.25}`
      );

    return () => {
      timelime.kill();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div
        ref={textRef}
        className="relative text-xs backdrop-blur-md px-4 bg-black/10 py-3 text-center opacity-0 rounded-xl"
      >
        <Congratulation />
        {children}
      </div>
      <div>
        <div
          ref={paginationRef}
          className="text-[9px] font-light border border-white/10 rounded-full px-2 py-1 whitespace-nowrap opacity-0"
        >
          <span>
            {currentItem + 1} / {maxItems}
          </span>
        </div>
      </div>
    </div>
  );
};
