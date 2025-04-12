import { initGame } from '@/domains/Game';
import { useCallback, useReducer } from 'react';
import { gameReducer } from '@/reducers/gameReducer.ts';

export const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, undefined, () => initGame());

  // Стабильные функции действий
  const flipCard = useCallback((index: number) => {
    dispatch({type: 'FLIP_CARD', index});
  }, []);

  const tick = useCallback(() => {
    dispatch({type: 'TICK'});
  }, []);

  const resetGame = useCallback(() => {
    dispatch({type: 'RESET_GAME'});
  }, []);

  const checkMatch = useCallback(() => {
    dispatch({type: 'CHECK_MATCH'});
  }, []);

  const setGameOver = useCallback(() => {
    dispatch({type: 'SET_GAME_OVER'});
  }, []);

  return {
    state,
    flipCard,
    tick,
    resetGame,
    checkMatch,
    setGameOver,
  };
};