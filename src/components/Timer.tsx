import { IconTimer } from "@/icons/IconTimer";
import { useGameStore } from "@/store/game";
import { formatTime } from "@/utils/time";
import { useEffect, useState } from "react";

export const Timer = () => {
  const totalSeconds = 20;
  const { gameOver } = useGameStore();
  const [seconds, setSeconds] = useState(totalSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      gameOver();
      return;
    }

    const timeout = setTimeout(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [seconds, gameOver]);

  return (
    <div className="flex items-center justify-center gap-2">
      <div>
        <IconTimer />
      </div>
      <div>{formatTime(seconds)}</div>
    </div>
  );
};
