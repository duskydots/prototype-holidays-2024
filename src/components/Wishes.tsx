import { useGameStore } from "@/store/game";
import { Wish } from "@/components/Wish";
import { useEffect, useMemo, useState } from "react";

const items = [
  `You’re the most magical part of the most wonderful time of the year.`,
  `Sending a smile across the miles for a wonderful Christmas!`,
  `Christmas won't be the same without you here.`,
  `Wishing you a season full of light and laughter for you and your family.`,
  `We hope the magic of Christmas fills every corner of your heart and home with joy — now and always.`,
  `Merry Christmas with lots of love.`,
  `Christmas won't be the same without you here.`,
  `Wishing you many happy memories in 2024!`,
  `We hope your new year is full of laughs... and lots of good treats!`,
  `May all your dreams come true in 2024!`,
  `Time to party like it’s 2024!`,
  `Best wishes to your family in the coming year.`,
  `Happy New Year, buddy! To put it simply, you're the best.`,
  `Happy New Year! Thank you for being an important part of an amazing year.`,
  `Thank you for everything this past year—looking forward to seeing you in 2024.`,
  `There’s no way we would have had the year we did without your hard work and dedication. Now, enjoy some time off.`,
  `Remember, Santa is watching. Everything. Yes, even that. Anyway, Merry Christmas!`,
  `May your holidays sparkle with joy and laughter.`,
  `Wishing you a wonderful holiday season.`,
  `Wishing you a season that’s merry and bright!`,
  `It’s people like you that make Christmas so special and meaningful. Thank you!`,
  `Have a magical holiday season!`,
  `Wishing you a fun-filled holiday season!`,
  `May you share wonderful memories with your loved ones this year.`,
  `Happiest Christmas to your whole family.`,
  `Happy New Year! 2024 is absolutely the year for you!`,
  `Wishing that you have a truly remarkable and blissful year ahead! Happy new year to you and your family!`,
  `May this coming year bless you with love, peace, and empowerment.`,
  `New adventures are around the corner. Happy New Year!`,
  `Happy New Year! 2024 isn’t even ready for you!`,
];

export const Wishes = () => {
  const { score } = useGameStore();
  const shuffledItems = useMemo(
    () => items.sort(() => 0.5 - Math.random()),
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentWish = useMemo(() => {
    return shuffledItems.slice(0, score)[currentIndex];
  }, [shuffledItems, score, currentIndex]);

  useEffect(() => {
    if (score <= 1) return;

    const timeout = setTimeout(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % score);
    }, currentWish.length * 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentIndex, currentWish, score]);

  return (
    <div className="relative w-full py-6">
      <Wish key={currentIndex} currentItem={currentIndex} maxItems={score}>
        {currentWish}
      </Wish>
    </div>
  );
};
