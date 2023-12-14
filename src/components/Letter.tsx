/* eslint-disable react/no-unescaped-entities */
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { IconClose } from "@/icons/IconClose";
import { DuskyDots } from "@/components/DuskyDots";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { CopyBlock, dracula } from "react-code-blocks";

const packages = `
  @react-three/drei
  @react-three/fiber
  @react-three/postprocessing
  @react-three/rapier
  @types/node
  @types/react
  @types/react-dom
  @types/three
  autoprefixer
  clsx
  eslint
  eslint-config-next
  gsap
  leva
  next
  postcss
  postprocessing
  react
  react-code-blocks
  react-dom
  tailwind-merge
  tailwindcss
  three
  typescript
  zustand

`;

interface Props {
  onComplete: () => void;
}

export const Letter = ({ onComplete }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.currentTarget.style.pointerEvents = "none";

    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    const timeline = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    timeline
      .to(content, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: `power3.in`,
      })
      .to(
        container,
        {
          opacity: 0,
          duration: 0.6,
          ease: `power3.in`,
        },
        0.4
      );
  };

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    const timeline = gsap.timeline({});

    timeline
      .fromTo(
        container,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.6,
          ease: `power3.out`,
        }
      )
      .fromTo(
        content,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: `power3.out`,
        },
        0.4
      );
    return () => {};
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 py-10 px-6 flex items-center justify-center bg-neutral-950 overflow-auto opacity-0"
    >
      <div
        ref={contentRef}
        className="relative w-full text-xs backdrop-blur-md px-6 bg-neutral-950/50 py-6 rounded-xl border border-white/10 flex flex-col gap-6 max-w-[800px] my-auto"
      >
        <div className="w-full flex items-center justify-between">
          <div className="max-w-[120px]">
            <Link href={`https://duskydots.com`} target="_blank">
              <DuskyDots className="w-full" />
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={onClose}
              className="w-[30px] h-[30px] flex items-center justify-end"
            >
              <IconClose />
            </button>
          </div>
        </div>
        <div>
          <Paragraph>
            This year, Santa (our digital version, of course!) is immersed in
            the virtual world collecting wishes!
            <br /> <br />
            We are not just about the tech, you know. We are about the people,
            the stories, the laughs. As we raise our glasses (or coffee cups for
            some of us) to the end of another year, we want to say a massive
            thank you. Thank you for being part of our story, for believing in
            us, and for helping us connect the DuskyDots!
            <br /> <br />
            It's a time to acknowledge how truly lucky we are, and that is
            because all of you!
            <br /> <br />
            To our clients, who've become more than just partners in business,
            but friends - your support from the start has been the wind beneath
            our wings. You've trusted us, believed in our vision.
            <br /> <br />
            To our dedicated team and contractors. Your commitment and hard work
            breathe life into our projects, turning visions into reality. Your
            expertise and camaraderie are the foundation of what DuskyDots is
            becoming.
            <br /> <br />
            To our suppliers, your reliability and excellence ensure that we
            always have the tools and resources we need to excel. You're an
            integral part of our daily operations and successes.
            <br /> <br />
            To our co-working offices in Queenstown and Auckland and to our
            accountants, your professionalism and support keep our business
            running smoothly. You provide the structure and guidance that enable
            us to focus on what we do best.
            <br /> <br />
            And to our families and friends, your support and encouragement fuel
            our passion and creativity. You are our safe harbor and our
            inspiration.
            <br /> <br />
            Merry Christmas, Happy Holidays, and here's to doing more great
            things together in the New Year!
          </Paragraph>
          <br />
          <br />
          <Heading>
            A special thanks to the open-source libraries and assets behind this
            experience.
          </Heading>
          <Paragraph>
            <li>
              Background image{" "}
              <a
                className="text-blue-500"
                href="https://unsplash.com/@oldfieldart"
                target="_blank"
              >
                by Timothy Oldfield (unsplash)
              </a>
            </li>
            <li>
              Santa 3D{" "}
              <a
                className="text-blue-500"
                href="https://sketchfab.com/3d-models/santa-claus-fde418c4ed3a452aa8fb4b4062f39b15"
                target="_blank"
              >
                by @degurechaff (sketchfab)
              </a>
            </li>
          </Paragraph>
          <br></br>
          <Paragraph>And to all the packages/libraries:</Paragraph>
          <Paragraph>
            <div className="relative w-full overflow-x-auto bg-[#282a36] rounded-md">
              <CopyBlock theme={dracula} text={packages} language={"json"} />
            </div>
          </Paragraph>
        </div>
      </div>
    </div>
  );
};
