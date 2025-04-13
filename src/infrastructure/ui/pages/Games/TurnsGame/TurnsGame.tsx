import Deck from '@/infrastructure/ui/components/Deck';
import Info from '@/infrastructure/ui/components/Info';
import GameOver from '@/infrastructure/ui/components/GameOver';

import { useGame } from '@/application/game/useGame';
import { useGameTimer } from '@/application/hooks/useGameTimer';
import { useCardMatchCheck } from '@/application/hooks/useCardMatchCheck';
import { useGameOver } from '@/application/hooks/useGameOver';

import { LOSE_BY_TURNS, WIN } from '@/domains/game/constants';

const COUNT_TURNS_TO_END_GAME = 12;

export const TurnsGame = () => {

  const {state, checkMatch, flipCard, tick, resetGame, setGameOver} = useGame();
  const {deck, flipped, matched, turns, time, endGame, gameOver} = state;

  useGameTimer(!endGame, tick);
  useCardMatchCheck(flipped.length, checkMatch);
  useGameOver(turns, turns === COUNT_TURNS_TO_END_GAME + 1, setGameOver);

  return (
    <main>
      <Info turns={ COUNT_TURNS_TO_END_GAME - turns } reset={ resetGame }/>

      <Deck
        deck={ deck }
        flipped={ flipped }
        matched={ matched }
        onCardClick={ flipCard }
      />

      <GameOver
        endGame={ endGame }
        gameOver={ gameOver }
        title={ gameOver ? LOSE_BY_TURNS : WIN }
        reset={ resetGame }
        turns={ turns }
        time={ time }
      />
    </main>
  );
};