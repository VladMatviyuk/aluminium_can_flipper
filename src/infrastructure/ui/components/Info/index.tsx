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
    <div className="info">

      { time !== undefined && <p>Время: { time }</p> }
      { turns !== undefined && <p>Ход: { turns >= 0 ? turns : 0 }</p> }

      <div className="actions">
        <IoReload onClick={ reset } style={ {color: 'white', fontSize: '22px'} }/>
        <Link to={ '..' }>
          <IoMdClose style={ {color: 'white', fontSize: '32px'} }/>
        </Link>
      </div>

    </div>
  )
}

export default Info;