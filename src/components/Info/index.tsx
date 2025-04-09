import {FC} from 'react';

interface IProps {
  readonly score: number;
  readonly turns: number;
}

const Info: FC<IProps> = ({score, turns}) => {
  return (
    <div className="info">
      <p>Очки: {score}</p>
      <p>Попытки: {turns}/15</p>
    </div>
  )
}

export default Info;