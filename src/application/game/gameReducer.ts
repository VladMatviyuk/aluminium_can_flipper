import { initGame, flipCard, checkMatch, tick, setGameOver } from '@/domains/game/Game';
import { GameState } from '@/domains/game/Game';

export const gameReducer = (state: GameState, action: { type: string; index?: number }): GameState => {
  switch (action.type) {
    case 'FLIP_CARD':
      return flipCard(state, action.index!);
    case 'CHECK_MATCH':
      return checkMatch(state);
    case 'RESET_GAME':
      return initGame();
    case 'TICK':
      return tick(state);
    case 'SET_GAME_OVER':
      return setGameOver(state);
    default:
      return state;
  }
};