import { useReducer, useEffect } from 'react';
import './App.css';


const generateDeck = () => {
  const beers = [1,2,3,4,5,6];
  const deck = [];
  // Каждому цвету добавляем две карточки
  for (const beer of beers) {
    deck.push({ beer, matched: false });
    deck.push({ beer, matched: false });
  }
  // Перемешиваем колоду
  return deck.sort(() => Math.random() - 0.5);
};


const initialState = {
  deck: generateDeck(),
  flipped: [],
  matched: [],
  turns: 0,
  score: 0,
  pendingReset: false,
  gameOver: false,
};


const gameReducer = (state, action) => {
  switch (action.type) {

    case 'FLIP_CARD':
      // Переворачиваем карточку
      if (state.flipped.length < 2 && !state.flipped.includes(action.index) && !state.matched.includes(state.deck[action.index].beer)) {
        return { ...state, flipped: [...state.flipped, action.index] };
      }
      return state;
    case 'CHECK_MATCH':
      debugger
      // Проверяем совпадение перевернутых карточек
      const [first, second] = state.flipped;
      if (state.deck[first].beer === state.deck[second].beer) {
        const newMatched = [...state.matched, state.deck[first].beer];
        const isGameOver = newMatched.length === state.deck.length / 2;
        return {
          ...state,
          matched: newMatched,
          score: isGameOver ? state.score + 1 : state.score,
          flipped: [],
          pendingReset: false,
          gameOver: isGameOver,
        };
      } else {
        return { ...state, pendingReset: true };
      }
    case 'RESET_FLIPPED':
      // Сбрасываем перевернутые карточки
      return { ...state, flipped: [], pendingReset: false };
    case 'INCREMENT_TURN':
      // Увеличиваем счетчик попыток
      return { ...state, turns: state.turns + 1 };
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


const App = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);


  // Проверка на совпадение перевернутых карточек
  useEffect(() => {
    if (state.flipped.length === 2) {
      dispatch({ type: 'CHECK_MATCH' });
      dispatch({ type: 'INCREMENT_TURN' });
    }
  }, [state.flipped]);


  // Таймер для сброса перевернутых карточек
  useEffect(() => {
    if (state.pendingReset) {
      const timer = setTimeout(() => {
        dispatch({ type: 'RESET_FLIPPED' });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.pendingReset]);


  // Обработка клика на карточку
  const handleCardClick = (index) => {
    if (!state.gameOver && state.flipped.length < 2 && !state.flipped.includes(index)) {
      dispatch({ type: 'FLIP_CARD', index });
    }
  };


  const handlePlayAgain = () => {
    dispatch({ type: 'RESET_GAME' });
  };


  return (
    <div className="App">
      <img src="/beers/1.jpeg" alt="" />
      <h1>Beer flip</h1>
      <div className="info">
        <p>Очки: {state.score}</p>
        <p>Попытки: {state.turns}/15</p>
      </div>
      <div className="deck">
        {state.deck.map((card, index) => (
          <div
            key={index}
            className={`card ${state.flipped.includes(index) || state.matched.includes(card.beer) ? 'flipped show' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {
              state.flipped.includes(index) || state.matched.includes(card.beer) 
                ? <img src={`beers/${card.beer}.jpeg`} />
                : <></>
            }
          </div>
        ))}
      </div>
      {state.gameOver && (
        <>
          <div className="overlay" />
          <div className="game-over">
            <h2>Вы выиграли!</h2>
            <button onClick={handlePlayAgain}>Заново</button>
          </div>
        </>
      )}
      {!state.gameOver && state.turns >= 15 && (
        <>
          <div className="overlay" />
          <div className="game-over">
            <h2>Игра окончена!</h2>
            <button onClick={handlePlayAgain}>Заново</button>
          </div>
        </>
      )}
    </div>
  );
};


export default App;