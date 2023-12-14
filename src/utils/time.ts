export const formatNumberToString = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`;
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  const remainingSeconds = seconds % 60;

  return `${formatNumberToString(hours)}:${formatNumberToString(
    minutes
  )}:${formatNumberToString(remainingSeconds)}`;
};
