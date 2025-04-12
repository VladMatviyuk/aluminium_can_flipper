import { FC } from 'react';
import { Card } from '@/domains/Deck.ts';

interface IProps {
  readonly deck: Card[];
  readonly flipped: number[];
  readonly matched: number[];
  readonly onCardClick: (index: number) => void;
}

const Deck: FC<IProps> = ({deck, flipped, matched, onCardClick}) => {

  return (
    <div className="deck">
      { deck.map((card: Card, index: number) => (
        <div
          key={ index }
          className={ `card ${ flipped.includes(index) || matched.includes(card.id) ? 'flipped show' : '' }` }
          onClick={ () => onCardClick(index) }
        >
          {
            flipped.includes(index) || matched.includes(card.id)
              ? <img src={ `beers/${ card.id }.jpeg` } alt="card"/>
              : <></>
          }
        </div>
      )) }
    </div>
  )
}

export default Deck;