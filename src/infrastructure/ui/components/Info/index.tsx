import style from './style.module.css';

import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { IoReload } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

interface IProps {
  readonly turns?: number;
  readonly time?: number;
  readonly reset: () => void;
}

const Info: FC<IProps> = ({turns, reset, time}) => {
  return (
    <div className={ style.info }>

      { time !== undefined && <p>Время: { time }</p> }
      { turns !== undefined && <p>Ход: { turns >= 0 ? turns : 0 }</p> }

      <div className={ style.actions }>
        <IoReload onClick={ reset } className={ `${ style.icon } ${ style.reload }` }/>
        <Link to={ '..' }>
          <IoMdClose className={ `${ style.icon } ${ style.close }` }/>
        </Link>
      </div>

    </div>
  )
}

export default Info;