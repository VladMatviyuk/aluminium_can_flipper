import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { IoReload, IoHomeOutline } from 'react-icons/io5';

interface IProps {
  readonly title: string;
  readonly gameOver: boolean;
  readonly content?: ReactNode;
  readonly reset: () => void;
}

const GameOver: FC<IProps> = ({title, reset, content, gameOver}) => {
  const overlayClassNames = `overlay ${ gameOver ? '' : 'overlay-win' }`
  return (
    <>
      <div className={ overlayClassNames }/>
      <div className="game-over">
        <h2>{ title }</h2>
        { content }
        <div className="actions">
          <Link to={ '/' }>
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