import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { IoReload, IoHomeOutline } from 'react-icons/io5';

interface IProps {
  readonly endGame: boolean;
  readonly title: string;
  readonly gameOver: boolean;
  readonly turns: number;
  readonly time: number;
  readonly reset: () => void;
}

const GameOver: FC<IProps> = ({endGame, title, reset, gameOver, turns, time}) => {

  if (!endGame) return;

  const overlayClassNames = `overlay ${ gameOver ? '' : 'overlay-win' }`;
  return (
    <>
      <div className={ overlayClassNames }/>
      <div className="game-over">
        <h2>{ title }</h2>

        <div>
          <p>Попыток: { turns }</p>
          <p>Время: { time }</p>
        </div>

        <div className="actions">
          <Link to={ '..' }>
            <IoHomeOutline onClick={ reset } style={ {color: 'white', fontSize: '22px'} }/>
          </Link>
          <button onClick={ reset } style={ {background: gameOver ? 'red' : 'green'} }>
            <IoReload onClick={ reset } style={ {color: 'white', fontSize: '22px'} }/>
          </button>
        </div>
      </div>
    </>
  )
}

export default GameOver;