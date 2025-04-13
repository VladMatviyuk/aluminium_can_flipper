import { useEffect } from 'react';

export const useGameOver = (
  source: number,
  condition: boolean,
  setGameOver: () => void,
) => {
  useEffect(() => {
    if (condition) setGameOver();
  }, [source])
}