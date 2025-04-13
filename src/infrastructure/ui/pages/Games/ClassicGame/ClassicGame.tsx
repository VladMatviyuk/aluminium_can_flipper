import Deck from '@/infrastructure/ui/components/Deck';
import Info from '@/infrastructure/ui/components/Info';
import GameOver from '@/infrastructure/ui/components/GameOver';

import { useGame } from '@/application/game/useGame';
import { useGameTimer } from '@/application/hooks/useGameTimer';
import { useCardMatchCheck } from '@/application/hooks/useCardMatchCheck';

import { WIN } from '@/domains/game/constants';

export const ClassicGame = () => {

  const {state, checkMatch, flipCard, tick, resetGame} = useGame();
  const {deck, flipped, matched, turns, time, endGame, gameOver} = state;

  useGameTimer(!endGame, tick);
  useCardMatchCheck(flipped.length, checkMatch);

  return (
    <main>
      <Info time={ time } turns={ turns } reset={ resetGame }/>

      <Deck
        deck={ deck }
        flipped={ flipped }
        matched={ matched }
        onCardClick={ flipCard }
      />

      <GameOver
        endGame={ endGame }
        turns={ turns }
        time={ time }
        title={ WIN }
        gameOver={ gameOver }
        reset={ resetGame }
      />
    </main>
  );
};