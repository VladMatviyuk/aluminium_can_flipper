import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IoReload } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

interface IProps {
  readonly turns?: number;
  readonly timeLeft?: number;
  readonly reset: () => void;
}

const Info: FC<IProps> = ({turns, reset, timeLeft}) => {
  return (
    <div className="info">

      { timeLeft && <p>Время: { timeLeft }</p> }
      { turns !== undefined && <p>Попытки: { turns }/15</p> }

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