import Deck from '@/infrastructure/ui/components/Deck';
import Info from '@/infrastructure/ui/components/Info';
import GameOver from '@/infrastructure/ui/components/GameOver';

import { useGame } from '@/application/game/useGame';
import { useGameTimer } from '@/application/hooks/useGameTimer';
import { useCardMatchCheck } from '@/application/hooks/useCardMatchCheck';
import { useGameOver } from '@/application/hooks/useGameOver';

import { LOSE_BY_TIME, WIN } from '@/domains/game/constants';

const COUNT_TIME_TO_END_GAME = 15;

export const TimeGame = () => {

  const {state, checkMatch, flipCard, tick, resetGame, setGameOver} = useGame();
  const {deck, flipped, matched, gameOver, turns, time, endGame} = state;

  useGameTimer(!endGame, tick);
  useCardMatchCheck(flipped.length, checkMatch);
  useGameOver(time, time === COUNT_TIME_TO_END_GAME, setGameOver);

  return (
    <main>
      <Info time={ COUNT_TIME_TO_END_GAME - time } reset={ resetGame }/>

      <Deck
        deck={ deck }
        flipped={ flipped }
        matched={ matched }
        onCardClick={ flipCard }
      />

      <GameOver
        endGame={ endGame }
        gameOver={ gameOver }
        title={ gameOver ? LOSE_BY_TIME : WIN }
        reset={ resetGame }
        turns={ turns }
        time={ time }
      />
    </main>
  );
};