import { create } from "zustand";

type GameStateType = `` | `playing` | `game-over`;

interface Props {
  game: GameStateType;
  score: number;
  playGame: () => void;
  gameOver: () => void;
  addScore: () => void;
}

export const useGameStore = create<Props>((set) => ({
  score: 0,
  game: ``,
  playGame: () => set({ game: `playing`, score: 0 }),
  gameOver: () => set({ game: `game-over` }),
  addScore: () => set((state) => ({ score: state.score + 1 })),
}));
