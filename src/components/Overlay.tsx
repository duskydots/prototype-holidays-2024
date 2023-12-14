import { useGameStore } from "@/store/game";
import { isTouch } from "@/utils/device";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { IconPlay } from "@/icons/IconPlay";
import { Status } from "@/components/Status";
import { Text } from "@/components/Text";
import { Wishes } from "@/components/Wishes";

export const Overlay = () => {
  const { game, score, playGame } = useGameStore();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between p-6">
      {game === `` && (
        <>
          <Header />
          <div>
            <div className="w-full flex items-center justify-center flex-col gap-4">
              <div className="px-3">
                <div>
                  <Text>
                    It{`'`}s almost Christmas and Santa is running late!
                    <br />
                    Help him deliver the best wishes!
                  </Text>
                </div>
              </div>
              <div>
                <Button
                  onClick={() => {
                    playGame();
                  }}
                >
                  Start Game
                  <IconPlay />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      {game === `playing` && (
        <>
          <div className="w-full flex items-center justify-center">
            <Status />
          </div>
          <div>
            <div className="w-full flex items-center justify-center flex-col gap-4">
              <div className="px-3">
                <Text>
                  {isTouch()
                    ? `Tap and hold to help Santa collect the best wishes!`
                    : `Move the cursor to help Santa collect the best wishes!`}
                </Text>
              </div>
            </div>
          </div>
        </>
      )}
      {game === `game-over` && (
        <>
          <Header />
          <div>
            <div className="w-full flex items-center justify-center flex-col gap-4">
              {score > 0 && <Wishes />}
              <div className="px-3">
                {score > 0 ? (
                  <Text>
                    Amazing! You helped Santa deliver {score} best wish
                    {`${score > 1 ? `es` : ``}`}.<br />
                    Now, it{`'`}s time to celebrate!
                    <br />
                    <br />
                    Merry Christmas and Happy New Year!
                  </Text>
                ) : (
                  <Text>
                    Oh no! You couldn{`'`}t help Santa deliver any best wishes,
                    but don{`'`}t worry! You can try again.
                  </Text>
                )}
              </div>
              <div className="relative">
                <Button
                  onClick={() => {
                    playGame();
                  }}
                >
                  Play Again
                  <IconPlay />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
