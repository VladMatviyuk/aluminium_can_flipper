import style from './style.module.css';

import { type FC } from 'react';
import { Card } from '@/domains/deck/Deck';

interface IProps {
  readonly deck: Card[];
  readonly flipped: number[];
  readonly matched: number[];
  readonly onCardClick: (index: number) => void;
}

const Deck: FC<IProps> = ({deck, flipped, matched, onCardClick}) => {

  return (
    <div className={ style.deck }>
      {
        deck.map((card: Card, index: number) => (
          <div
            key={ index }
            className={ `
            ${ style.card } 
            ${ flipped.includes(index) || matched.includes(card.id) ? `${ style.flipped } ${ style.show }` : '' }
           ` }
            onClick={ () => onCardClick(index) }
          >
            {
              flipped.includes(index) || matched.includes(card.id)
                ? <img src={ `bottle/${ card.id }.webp` } alt="card"/>
                : <></>
            }
          </div>
        ))
      }
    </div>
  )
}

export default Deck;