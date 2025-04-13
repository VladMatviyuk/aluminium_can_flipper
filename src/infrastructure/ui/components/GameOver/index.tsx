import style from './style.module.css';

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

  return (
    <>
      <div className={ style.overlay }/>
      <div className={ style.gameOver }>
        <h2 className={ style.title }>{ title }</h2>

        <div>
          <p>Попыток: { turns }</p>
          <p>Время: { time }</p>
        </div>

        <div className={ style.actions }>
          <Link to={ '..' }>
            <IoHomeOutline onClick={ reset } className={ style.icon }/>
          </Link>

          <button className={ style.button } onClick={ reset }
                  style={ {background: gameOver ? 'red' : 'green'} }>
            <IoReload onClick={ reset } className={ style.icon }/>
          </button>
        </div>
      </div>
    </>
  )
}

export default GameOver;