import { useGame } from '@/hooks/useGame';
import { useEffect } from 'react';
import Deck from '@/components/Deck';
import Info from '@/components/Info';
import GameOver from '@/components/GameOver';

const COUNT_TURNS_TO_END_GAME = 15;

export const TurnsGame = () => {
  const {state, checkMatch, flipCard, tick, resetGame, setGameOver} = useGame();

  const {deck, flipped, matched, turns, time, endGame, gameOver} = state;

  // Логика таймера
  useEffect(() => {
    if (endGame) return;

    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, [endGame, tick]); // Зависимости стабильны благодаря useCallback

  // Проверка совпадений
  useEffect(() => {
    if (flipped.length === 2) {
      const timer = setTimeout(() => checkMatch(), 400);
      return () => clearTimeout(timer);
    }
  }, [flipped]);

  useEffect(() => {
    if (turns > COUNT_TURNS_TO_END_GAME) setGameOver();
  }, [turns])

  return (
    <main>
      <Info turns={ COUNT_TURNS_TO_END_GAME - turns } reset={ resetGame }/>
      <Deck
        deck={ deck }
        flipped={ flipped }
        matched={ matched }
        onCardClick={ flipCard }
      />
      { endGame && (
        <GameOver
          gameOver={ gameOver }
          title={ gameOver ? 'Попытки закончились!' : 'Вы выиграли!' }
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