import { Info } from "@/components/Info";
import { Timer } from "@/components/Timer";
import { Score } from "@/components/Score";

export const Status = () => {
  return (
    <Info>
      <div className="flex items-center justify-between gap-4">
        <Timer />
        <div className="opacity-10">|</div>
        <Score />
      </div>
    </Info>
  );
};
