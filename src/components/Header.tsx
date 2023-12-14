import Link from "next/link";
import { Button } from "@/components/Button";
import { DuskyDots } from "@/components/DuskyDots";
import { IconHeart } from "@/icons/IconHeart";
import { Letter } from "@/components/Letter";
import { useState } from "react";

export const Header = () => {
  const [showLetter, setShowLetter] = useState(false);

  return (
    <div className="w-full flex items-center justify-between">
      <div className="max-w-[100px]">
        <Link href={`https://duskydots.com`} target="_blank">
          <DuskyDots className="w-full" />
        </Link>
      </div>
      <div className="relative">
        <Button
          onClick={() => {
            setShowLetter(true);
          }}
        >
          Special Wishes
          <IconHeart />
        </Button>
      </div>
      {showLetter && (
        <Letter
          onComplete={() => {
            setShowLetter(false);
          }}
        />
      )}
    </div>
  );
};
