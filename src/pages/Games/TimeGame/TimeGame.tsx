import { useGame } from '@/hooks/useGame';
import { useEffect } from 'react';
import Deck from '@/components/Deck';
import Info from '@/components/Info';
import GameOver from '@/components/GameOver';

const COUNT_TIME_TO_END_GAME = 15;

export const TimeGame = () => {
  const {state, checkMatch, flipCard, tick, resetGame, setGameOver} = useGame();

  const {deck, flipped, matched, gameOver, turns, time, endGame} = state;

  // Логика таймера
  useEffect(() => {
    if (endGame) return;

    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, [endGame, tick]); // Зависимости стабильны благодаря useCallback

  // Проверка совпадений
  useEffect(() => {
    if (endGame) return;
    
    if (flipped.length === 2) {
      const timer = setTimeout(() => checkMatch(), 400);
      return () => clearTimeout(timer);
    }
  }, [flipped]);

  useEffect(() => {
    if (time === COUNT_TIME_TO_END_GAME) {
      setGameOver();
    }
  }, [time]);

  return (
    <main>
      <Info time={ COUNT_TIME_TO_END_GAME - time } reset={ resetGame }/>
      <Deck
        deck={ deck }
        flipped={ flipped }
        matched={ matched }
        onCardClick={ flipCard }
      />
      { endGame && (
        <GameOver
          gameOver={ gameOver }
          title={ gameOver ? 'Время вышло!' : 'Вы выиграли!' }
          reset={ resetGame }
          content={
            <div>
              <p>Попыток: { turns }</p>
              <p>Время: { time }</p>
            </div>
          }
        />
      ) }
    </main>
  );
};