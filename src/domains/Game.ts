import { createDeck, markCardAsMatched, Card } from './Deck';

export type GameState = {
  deck: Card[];
  flipped: number[];
  matched: number[];
  turns: number;
  time: number;
  endGame: boolean;
  gameOver: boolean;
}

// Начальное состояние
export const initGame = (): GameState => ( {
  deck: createDeck(),
  flipped: [],
  matched: [],
  turns: 0,
  time: 0,
  endGame: false,
  gameOver: false,
} );

// Действия
export const flipCard = (state: GameState, index: number): GameState => {
  if (
    state.endGame ||
    state.flipped.length >= 2 ||
    state.flipped.includes(index) ||
    state.deck[index].matched
  ) {
    return state;
  }
  return {...state, flipped: [...state.flipped, index]};
};

export const checkMatch = (state: GameState): GameState => {
  if (state.flipped.length !== 2) return state;

  const [first, second] = state.flipped;
  const deck = state.deck;

  if (deck[first].id === deck[second].id) {
    const newMatched = [...state.matched, deck[first].id];

    return {
      ...state,
      deck: markCardAsMatched(deck, deck[first].id),
      matched: newMatched,
      flipped: [],
      endGame: newMatched.length === deck.length / 2,
      turns: state.turns + 1,
    };
  } else {
    return {
      ...state,
      flipped: [],
      turns: state.turns + 1,
    };
  }
};

export const tick = (state: GameState): GameState => {
  if (state.endGame) return state;

  return {
    ...state,
    time: state.time + 1,
    endGame: state.endGame,
  };
};

export function setGameOver(state: GameState) {
  return {
    ...state,
    endGame: true,
    gameOver: true,
  }
}