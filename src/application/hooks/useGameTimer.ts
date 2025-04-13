import { useEffect } from 'react';
import { ONE_SECOND } from '@/domains/game/constants';

export const useGameTimer = (
  isGameActive: boolean,
  onTick: () => void,
  interval: number = ONE_SECOND
) => {
  useEffect(() => {
    if (!isGameActive) return;

    const timerId = setInterval(onTick, interval);
    return () => clearInterval(timerId);
  }, [isGameActive, onTick, interval]);
};