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
        { title === 'Вы выиграли!' &&
          <img src="public/_.gif" alt="firework" style={ {width: '100px', borderRadius: `10px`} }/>
        }
        <button onClick={ reset } style={ {background: title === 'Вы выиграли!' ? 'green' : 'red'} }>Заново</button>
      </div>
    </>
  )
}

export default GameOver;