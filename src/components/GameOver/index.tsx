import { FC } from 'react';

interface IProps {
  readonly title: string;
  readonly reset: () => void;
}

const GameOver: FC<IProps> = ({title, reset}) => {
  return (
    <>
      <div className="overlay"/>
      <div className="game-over">
        <h2>{ title }</h2>
        <button onClick={ reset }>Заново</button>
      </div>
    </>
  )
}

export default GameOver;