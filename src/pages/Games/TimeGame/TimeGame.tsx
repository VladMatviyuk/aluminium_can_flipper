import { useEffect, useReducer } from 'react';

import Info from '@/components/Info';
import Deck from '@/components/Deck';
import GameOver from '@/components/GameOver';

interface IDeck {
  beer: number;
  matched: boolean;
}

const generateDeck = (): IDeck[] => {
  const beers: number[] = getRandomUniqueNumbers(6);

  const deck = [];
  // Каждому цвету добавляем две карточки
  for (const beer of beers) {
    deck.push({beer, matched: false});
    deck.push({beer, matched: false});
  }
  // Перемешиваем колоду
  return deck.sort(() => Math.random() - 0.5);
};

export interface IState {
  deck: IDeck[];
  flipped: number[];
  matched: number[];
  pendingReset: boolean;
  gameOver: boolean;
  timeLeft: number;
}

const initialState: IState = {
  deck: generateDeck(),
  flipped: [],
  matched: [],
  pendingReset: false,
  gameOver: false,
  timeLeft: 16,
};

interface IAction {
  index?: number;
  type: string;
}

function getRandomUniqueNumbers(length: number, min = 1, max = 34): number[] {
  const numbers = new Set();

  while (numbers.size < length) {
    const randomNumber = Math.floor(Math.random() * ( max - min + 1 )) + min;
    numbers.add(randomNumber);
  }
  return Array.from(numbers) as number[];
}

const gameReducer = (state: IState, action: IAction) => {
  switch (action.type) {

    case 'FLIP_CARD':
      // Переворачиваем карточку
      if (state.flipped.length < 2 && action.index !== undefined && !state.flipped.includes(action.index) && !state.matched.includes(state.deck[action.index].beer)) {
        return {...state, flipped: [...state.flipped, action.index]};
      }
      return state;
    case 'CHECK_MATCH':
      // Проверяем совпадение перевернутых карточек
      const [first, second] = state.flipped;
      if (state.deck[first].beer === state.deck[second].beer) {
        const newMatched = [...state.matched, state.deck[first].beer];
        const isGameOver = newMatched.length === state.deck.length / 2;
        return {
          ...state,
          matched: newMatched,
          flipped: [],
          pendingReset: false,
          gameOver: isGameOver,
        };
      } else {
        return {...state, pendingReset: true};
      }
    case 'RESET_FLIPPED':
      // Сбрасываем перевернутые карточки
      return {...state, flipped: [], pendingReset: false};

    case 'TICK':
      if (state.timeLeft > 0) {
        const newTime = state.timeLeft - 1;
        return {
          ...state,
          timeLeft: newTime,
          gameOver: newTime === 0 ? true : state.gameOver,
        };
      }
      return state;
    case 'RESET_GAME':
      // Сбрасываем состояние игры
      return {
        ...initialState,
        deck: generateDeck(),
      };
    default:
      return state;
  }
};

export const TimeGame = () => {

  const [state, dispatch] = useReducer(gameReducer, initialState);

// Проверка на совпадение перевернутых карточек
  useEffect(() => {
    if (state.flipped.length === 2) {
      dispatch({type: 'CHECK_MATCH'});
    }
  }, [state.flipped]);

  // Запускаем таймер
  useEffect(() => {
    if (!state.gameOver && state.timeLeft > 0) {
      const timerId = setInterval(() => {
        dispatch({type: 'TICK'});
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [state.gameOver, state.timeLeft]);


// Таймер для сброса перевернутых карточек
  useEffect(() => {
    if (state.pendingReset) {
      const timer = setTimeout(() => {
        dispatch({type: 'RESET_FLIPPED'});
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state.pendingReset]);

  // Обновляем проверку завершения игры
  useEffect(() => {
    if (state.matched.length === state.deck.length / 2) {
      dispatch({type: 'GAME_OVER'});
    }
  }, [state.matched]);

// Обработка клика на карточку
  const handleCardClick = (index: number) => {
    if (!state.gameOver && state.flipped.length < 2 && !state.flipped.includes(index)) {
      dispatch({type: 'FLIP_CARD', index});
    }
  };

  const handlePlayAgain = () => {
    dispatch({type: 'RESET_GAME'});
  };

  return (
    <main>
      <Info timeLeft={ state.timeLeft } reset={ handlePlayAgain }/>
      <Deck state={ state } cardClick={ handleCardClick }/>

      { state.gameOver && (
        <GameOver
          title={ state.timeLeft === 0 ? 'Время вышло!' : 'Вы выиграли!' }
          reset={ handlePlayAgain }
        />
      ) }
    </main>
  )
}