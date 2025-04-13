import { useEffect } from 'react';
import { TIME_CHECK_MATCH } from '@/domains/game/constants';

export const useCardMatchCheck = (
  flippedCardsCount: number,
  onMatchCheck: () => void,
  delay: number = TIME_CHECK_MATCH
) => {
  useEffect(() => {
    if (flippedCardsCount === 2) {
      const timer = setTimeout(onMatchCheck, delay);
      return () => clearTimeout(timer);
    }
  }, [flippedCardsCount, onMatchCheck, delay]);
};