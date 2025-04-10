import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { IoReload } from 'react-icons/io5';

interface IProps {
  readonly turns?: number;
  readonly timeLeft?: number;
  readonly reset: () => void;
}

const Info: FC<IProps> = ({turns, reset, timeLeft}) => {
  return (
    <div className="info">
      <div className="actions">
        <Link to={ '..' }>
          <IoIosArrowRoundBack style={ {color: 'white', fontSize: '42px'} }/>
        </Link>
        <IoReload onClick={ reset } style={ {color: 'white', fontSize: '22px'} }/>
      </div>
      {
        timeLeft && <p>Время: { timeLeft }</p>
      }
      { turns && <p>Попытки: { turns }/15</p> }
    </div>
  )
}

export default Info;