import { FC } from 'react';
import { IState } from '@/App.tsx';

interface IProps {
  readonly state: IState;
  readonly cardClick: () => void;
}

const Deck: FC<IProps> = ({state, cardClick}) => {

  return (
    <div className="deck">
      { state.deck.map((card, index: number) => (
        <div
          key={ index }
          className={ `card ${ state.flipped.includes(index) || state.matched.includes(card.beer) ? 'flipped show' : '' }` }
          onClick={ () => cardClick(index) }
        >
          {
            state.flipped.includes(index) || state.matched.includes(card.beer)
              ? <img src={ `beers/${ card.beer }.jpeg` }/>
              : <></>
          }
        </div>
      )) }
    </div>
  )
}

export default Deck;