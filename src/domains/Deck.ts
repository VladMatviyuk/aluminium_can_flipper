import { generateRandomUniqueNumbersArray } from '@/utils/getRandomUniqueNumbers';

export type Card = { id: number, matched: boolean };

export const createDeck = (): Card[] => {
  const ids = generateRandomUniqueNumbersArray(6);
  const cards: Card[] = [];

  for (const id of ids) {
    cards.push({id, matched: false});
    cards.push({id, matched: false});
  }

  return shuffleCards(cards);
};

// Перемешивание карт
const shuffleCards = (cards: Card[]): Card[] => {
  return [...cards].sort(() => Math.random() - 0.5);
};

// Обновление карты
export const markCardAsMatched = (deck: Card[], id: number): Card[] => {
  return deck.map(card =>
    card.id === id ? {...card, matched: true} : card
  );
};